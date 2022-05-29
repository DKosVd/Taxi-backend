import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StreetController } from './street-position.controller';
import { StreetPositionService } from './street-position.service';
@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://www.mapquestapi.com',
    }),
  ],
  controllers: [StreetController],
  providers: [StreetPositionService],
})
export class StreetPositionModule {}
