import { Module } from '@nestjs/common';
import { ClientProxyZoomGK } from '@common/proxy/client-proxy';

@Module({
    providers: [ClientProxyZoomGK],
    exports: [ClientProxyZoomGK]
})
export class ProxyModule { }