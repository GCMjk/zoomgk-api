import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { ProxyModule } from '@common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [GuestController]
})
export class GuestModule {}
