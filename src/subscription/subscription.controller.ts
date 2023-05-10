import { Body, Controller, Post, Get, Put, Delete, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyZoomGK } from '@common/proxy/client-proxy';
import { Observable } from 'rxjs';

import { SubscriptionMSG } from '@common/constants';
import { ISubscription } from '@common/interfaces/subscription.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { SubscriptionDTO } from './dto/subscription.dto';

@ApiTags('subscriptions')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/subscription')
export class SubscriptionController {
    constructor(
        private readonly clientProxy: ClientProxyZoomGK
    ) {}

    private _clientProxySubscription = this.clientProxy.clientProxySubscriptions();

    @Post()
    create(@Body() subscriptionDTO: SubscriptionDTO): Observable<ISubscription> {
        return this._clientProxySubscription.send(SubscriptionMSG.CREATE, subscriptionDTO);
    }

    @Get()
    findAll(): Observable<ISubscription[]> {
        return this._clientProxySubscription.send(SubscriptionMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ISubscription> {
        return this._clientProxySubscription.send(SubscriptionMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() subscriptionDTO: SubscriptionDTO): Observable<ISubscription> {
        return this._clientProxySubscription.send(SubscriptionMSG.UPDATE, { id, subscriptionDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxySubscription.send(SubscriptionMSG.DELETE, id);
    }
}
