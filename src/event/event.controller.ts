import { Controller, Get, Put, Delete, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyZoomGK } from '@common/proxy/client-proxy';
import { Observable } from 'rxjs';

import { EventMSG, GuestMSG } from '@common/constants';
import { IEvent } from '@common/interfaces/event.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EventDTO } from './dto/event.dto';

@ApiTags('events')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/event')
export class EventController {
    constructor(
        private readonly clientProxy: ClientProxyZoomGK
    ) {}

    private _clientProxyEvent = this.clientProxy.clientProxyEvents();
    private _clientProxyGuest = this.clientProxy.clientProxyGuests();

    @Get()
    findAll(): Observable<IEvent[]> {
        return this._clientProxyEvent.send(EventMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IEvent> {
        return this._clientProxyEvent.send(EventMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() eventDTO: EventDTO): Observable<IEvent> {
        return this._clientProxyEvent.send(EventMSG.UPDATE, { id, eventDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyEvent.send(EventMSG.DELETE, id);
    }

    @Put(':eventId/guest/:guestId')
    async addGuestToEvent(
        @Param('eventId') eventId: string,
        @Param('guestId') guestId: string
    ) {
        const guest = await this._clientProxyGuest
            .send(GuestMSG.FIND_ONE, guestId);
        if (!guest) throw new HttpException('Guest not found', HttpStatus.NOT_FOUND);
        
        return this._clientProxyEvent.send(EventMSG.ADD_GUEST, { eventId, guestId });
    }
}
