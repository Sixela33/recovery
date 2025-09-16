import { Injectable } from '@nestjs/common';
import { CreateGalaxyDto } from './dto/create-galaxy.dto';
import { Galaxy } from './entities/Galaxy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecoveryService {
    
    constructor(
        @InjectRepository(Galaxy)
        private readonly galaxyRepository: Repository<Galaxy>,
    ) {}

    createGalaxy(createGalaxyDto: CreateGalaxyDto) {
        const galaxy = this.galaxyRepository.create(createGalaxyDto);
        return this.galaxyRepository.save(galaxy);
    }
}
