import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StreetPositionModule } from './street-position/street-position.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [AuthModule, StreetPositionModule],
  providers: [AppGateway],
})
export class AppModule {}
