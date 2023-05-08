import { Body, Controller, Post, Get, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyZoomGK } from '@common/proxy/client-proxy';
import { Observable } from 'rxjs';

import { EventMSG, UserMSG } from '@common/constants';
import { IUser } from '@common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import { EventDTO } from '../event/dto/event.dto';

@ApiTags('users')
@Controller('api/v1/user')
export class UserController {
    constructor(
        private readonly clientProxy: ClientProxyZoomGK
    ) {}

    private _clientProxyUser = this.clientProxy.clientProxyUsers();
    private _clientProxyEvent = this.clientProxy.clientProxyEvents();

    @Post()
    create(@Body() userDTO: UserDTO): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
    }

    @Get()
    findAll(): Observable<IUser[]> {
        return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyUser.send(UserMSG.DELETE, id);
    }

    @Post(':userId/event')
    async addEventToUser(
        @Param('userId') userId: string,
        @Body() eventDTO: EventDTO
    ) {
        const user = await this._clientProxyUser.send(UserMSG.FIND_ONE, userId);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        return this._clientProxyEvent.send(EventMSG.CREATE, { userId, eventDTO });
    }
}
