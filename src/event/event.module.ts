import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { ProxyModule } from '@common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [EventController]
})
export class EventModule {}
