import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RecoveryService } from './recovery.service';
import { CreateGalaxyDto, UpdateGalaxyDto } from './dto/create-galaxy.dto';

@Controller('recovery')
export class RecoveryController {
  constructor(private readonly recoveryService: RecoveryService) {}

    @Post('create-galaxy')
    createGalaxy(@Body() createGalaxyDto: CreateGalaxyDto) {
      return this.recoveryService.createGalaxy(createGalaxyDto);
    }

    @Get('get-galaxy/:walletAddress')
    getGalaxy(@Param('walletAddress') walletAddress: string) {
      return this.recoveryService.getGalaxy(walletAddress);
    }

    @Patch('update-galaxy/:walletAddress')
    async updateGalaxy(@Param('walletAddress') walletAddress: string, @Body() updateGalaxyDto: UpdateGalaxyDto) {
      const response = await this.recoveryService.updateGalaxy(walletAddress, updateGalaxyDto);
      return response;
    }
}
