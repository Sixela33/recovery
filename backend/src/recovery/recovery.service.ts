import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalaxyDto, UpdateGalaxyDto } from './dto/create-galaxy.dto';
import { Galaxy } from './entities/Galaxy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StellarService } from './services/stellar.service';
import { GuardiansOfTheGalaxy } from './entities/GuardiansOfTheGalaxy.entity';
import { EmailService } from './services/email.service';

@Injectable()
export class RecoveryService {
    
    constructor(
        @InjectRepository(Galaxy)
        private readonly galaxyRepository: Repository<Galaxy>,
        @InjectRepository(GuardiansOfTheGalaxy)
        private readonly guardiansRepository: Repository<GuardiansOfTheGalaxy>,
        private readonly stellarService: StellarService,
        private readonly emailService: EmailService,
    ) {}

    createGalaxy(createGalaxyDto: CreateGalaxyDto) {
        const guardians: GuardiansOfTheGalaxy[] = [];
        for (const guardian of createGalaxyDto.guardians) {
            const stellarAccount = this.stellarService.createAccount();
            const guardianEntity = new GuardiansOfTheGalaxy();
            guardianEntity.email = guardian.email;
            guardianEntity.phrase = guardian.phrase;
            guardianEntity.privateKey = stellarAccount.rawSecretKey().toString('hex');
            guardianEntity.account = stellarAccount.publicKey();
            guardians.push(guardianEntity);
        }

        const galaxy = this.galaxyRepository.create({
            ...createGalaxyDto,
            guardians,
        });
        
        return this.galaxyRepository.save(galaxy);
    }

    async getGalaxy(walletAddress: string) {
        const galaxy = await this.galaxyRepository.findOne({ where: { recoveryAddress: walletAddress }, relations: ['guardians'] });
        if (!galaxy) {
            throw new NotFoundException('Galaxy not found');
        }
        return galaxy;
    }

    async updateGalaxy(walletAddress: string, updateGalaxyDto: UpdateGalaxyDto) {
        const galaxy = await this.galaxyRepository.findOne({ 
            where: { recoveryAddress: walletAddress }, 
            relations: ['guardians'] 
        });
        if (!galaxy) {
            throw new NotFoundException('Galaxy not found');
        }

        // Update galaxy basic info
        galaxy.recoveryAddress = updateGalaxyDto.recoveryAddress || galaxy.recoveryAddress;

        // Handle guardians update if provided
        if (updateGalaxyDto.guardians) {
            // Remove existing guardians - use the galaxy ID instead of nested relation
            await this.guardiansRepository.delete({ galaxy: { id: galaxy.id } });
            
            // Create new guardians
            const newGuardians: GuardiansOfTheGalaxy[] = [];
            for (const guardian of updateGalaxyDto.guardians) {
                const stellarAccount = this.stellarService.createAccount();
                const guardianEntity = new GuardiansOfTheGalaxy();
                guardianEntity.email = guardian.email;
                guardianEntity.phrase = guardian.phrase;
                guardianEntity.privateKey = stellarAccount.rawSecretKey().toString('hex');
                guardianEntity.account = stellarAccount.publicKey();
                guardianEntity.galaxy = galaxy;
                newGuardians.push(guardianEntity);
            }
            
            // Save new guardians
            galaxy.guardians = await this.guardiansRepository.save(newGuardians);
        }

        await this.galaxyRepository.save(galaxy);
        return
    }

    async beginRecovery(key: string) {
        const galaxy = await this.galaxyRepository.findOne({ where: { recoveryAddress: key } });
        if (!galaxy) {
            throw new NotFoundException('Galaxy not found');
        }
        const guardians = await this.guardiansRepository.find({ where: { galaxy: { id: galaxy.id } } });
        for (const guardian of guardians) {
            guardian.recoverySecret = guardian.privateKey;
            await this.guardiansRepository.save(guardian);

            await this.emailService.sendRecoveryEmail(guardian.email, guardian.recoverySecret, galaxy);
        }

        return galaxy;
    }
}
