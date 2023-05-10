import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { ProxyModule } from '@common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
