import { Module } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { RecoveryController } from './recovery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galaxy } from './entities/Galaxy.entity';
import { GuardiansOfTheGalaxy } from './entities/GuardiansOfTheGalaxy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Galaxy, GuardiansOfTheGalaxy])],
  controllers: [RecoveryController],
  providers: [RecoveryService],
})
export class RecoveryModule {}
