import { Injectable } from '@nestjs/common';
import { CreateGalaxyDto } from './dto/create-galaxy.dto';
import { Galaxy } from './entities/Galaxy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StellarService } from './services/stellar.service';
import { GuardiansOfTheGalaxy } from './entities/GuardiansOfTheGalaxy.entity';

@Injectable()
export class RecoveryService {
    
    constructor(
        @InjectRepository(Galaxy)
        private readonly galaxyRepository: Repository<Galaxy>,
        @InjectRepository(GuardiansOfTheGalaxy)
        private readonly guardiansRepository: Repository<GuardiansOfTheGalaxy>,
        private readonly stellarService: StellarService,
    ) {}

    createGalaxy(createGalaxyDto: CreateGalaxyDto) {
        const guardians: GuardiansOfTheGalaxy[] = [];
        for (const guardian of createGalaxyDto.guardians) {
            const stellarAccount = this.stellarService.createAccount();
            const guardianEntity = new GuardiansOfTheGalaxy();
            guardian.email = guardian.email;
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
}
