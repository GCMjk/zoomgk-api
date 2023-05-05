import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyZoomGK } from '@common/proxy/client-proxy';
import { Observable } from 'rxjs';

import { IGuest } from '@common/interfaces/guest.interface';
import { GuestDTO } from './dto/guest.dto';
import { GuestMSG } from '@common/constants';

@ApiTags('guests')
@Controller('api/v1/guest')
export class GuestController {
    constructor(
        private readonly clientProxy: ClientProxyZoomGK
    ) {}

    private _clientProxyGuest = this.clientProxy.clientProxyGuests();

    @Post()
    create(@Body() guestDTO: GuestDTO): Observable<IGuest> {
        return this._clientProxyGuest.send(GuestMSG.CREATE, guestDTO);
    }

    @Get()
    findAll(): Observable<IGuest[]> {
        return this._clientProxyGuest.send(GuestMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IGuest> {
        return this._clientProxyGuest.send(GuestMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() guestDTO: GuestDTO): Observable<IGuest> {
        return this._clientProxyGuest.send(GuestMSG.UPDATE, { id, guestDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyGuest.send(GuestMSG.DELETE, id);
    }
}
