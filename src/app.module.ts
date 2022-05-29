import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StreetPositionModule } from './street-position/street-position.module';

@Module({
  imports: [AuthModule, StreetPositionModule],
})
export class AppModule {}
