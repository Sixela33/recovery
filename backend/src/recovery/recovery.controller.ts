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

    @Patch('update-galaxy/:id')
    async updateGalaxy(@Param('id') id: number, @Body() updateGalaxyDto: UpdateGalaxyDto) {
      
      console.log(updateGalaxyDto);
      const response = await this.recoveryService.updateGalaxy(id, updateGalaxyDto);
      console.log("response", response);
      return response;
    }
}
