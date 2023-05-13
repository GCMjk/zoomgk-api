import { Controller, Get, Put, Delete, Body, Param, HttpException, HttpStatus, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyZoomGK } from '@common/proxy/client-proxy';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';

import { EventMSG, UploadFileMSG, UserMSG } from '@common/constants';
import { IEvent } from '@common/interfaces/event.interface';
import { IFile } from '@common/interfaces/file.interface';
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
    private _clientProxyUser = this.clientProxy.clientProxyUsers();
    private _clientProxyUploadFile = this.clientProxy.clientProxyUploadFiles();

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

    @Put(':eventId/guest/:userId')
    async addGuestToEvent(
        @Param('eventId') eventId: string,
        @Param('userId') userId: string
    ) {
        const user = await this._clientProxyUser
            .send(UserMSG.FIND_ONE, userId);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        
        return this._clientProxyEvent.send(EventMSG.ADD_GUEST, { eventId, userId });
    }

    @Put(':id/cover')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCover(
        @Param('id') id: string,
        @UploadedFile() file
    ) {

        const event = await this._clientProxyEvent.send(EventMSG.FIND_ONE, id);
        if (!event) throw new HttpException('Event not found', HttpStatus.NOT_FOUND);

        const extensions = ['jpg', 'jpeg', 'png'];
        const route = ['event', id, 'cover'];
        const cover = await new Promise<IFile>((resolve, reject) => {
            this._clientProxyUploadFile.send(UploadFileMSG.UPLOAD, { file, route, extensions })
                .subscribe({
                    next: cover => resolve(cover),
                    error: err => reject(err),
                });
        });

        return await this._clientProxyEvent.send(EventMSG.UPLOAD_COVER, { id, cover });
    }
}
