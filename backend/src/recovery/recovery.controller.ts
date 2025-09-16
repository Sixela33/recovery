import { Body, Controller, Post } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { CreateGalaxyDto } from './dto/create-galaxy.dto';

@Controller('recovery')
export class RecoveryController {
  constructor(private readonly recoveryService: RecoveryService) {}

    @Post('create-galaxy')
    createGalaxy(@Body() createGalaxyDto: CreateGalaxyDto) {
      return this.recoveryService.createGalaxy(createGalaxyDto);
    }
}
