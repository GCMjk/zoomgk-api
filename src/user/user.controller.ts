import { Body, Controller, Post, Get, Put, Delete, Param, HttpException, HttpStatus, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxyZoomGK } from '@common/proxy/client-proxy';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EmailMSG, EventMSG, GuestMSG, SubscriptionMSG, UploadFileMSG, UserMSG } from '@common/constants';
import { IUser } from '@common/interfaces/user.interface';
import { IFile } from '@common/interfaces/file.interface';
import { ISubscription } from '@common/interfaces/subscription.interface';
import { IGuest } from '@common/interfaces/guest.interface';
import { UserDTO } from '@/user/dto/user.dto';
import { EventDTO } from '@/event/dto/event.dto';
import { GuestDTO } from '@/guest/dto/guest.dto';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
    constructor(
        private readonly clientProxy: ClientProxyZoomGK
    ) {}

    private _clientProxyUser = this.clientProxy.clientProxyUsers();
    private _clientProxyGuest = this.clientProxy.clientProxyGuests();
    private _clientProxyEvent = this.clientProxy.clientProxyEvents();
    private _clientProxySubscription = this.clientProxy.clientProxySubscriptions();
    private _clientProxyUploadFile = this.clientProxy.clientProxyUploadFiles();
    private _clientProxyEmail = this.clientProxy.clientProxyEmails();

    @Post()
    async create(@Body() userDTO: UserDTO) {
        const user = await new Promise<IUser>((resolve, reject) => {
            this._clientProxyUser.send(UserMSG.CREATE, userDTO)
                .subscribe({
                    next: user => resolve(user),
                    error: err => reject(err)
                });
        });

        const email = user.email;
        const confirmationToken = user.confirmationToken;

        const { status } = await new Promise<any>((resolve, reject) => {
            this._clientProxyEmail.send(EmailMSG.CONFIRMATION, { email, confirmationToken })
                .subscribe({
                    next: status => resolve(status),
                    error: err => reject(err)
                });
        });

        if (!status) {
            await this._clientProxyUser.send(UserMSG.DELETE, user._id);
            throw new HttpException('Error sending confirmation email', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return user;
            
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

    @Put('validate/:token')
    confirmedUser(@Param('token') token: string): Observable<IUser> {
        return this._clientProxyUser.send(UserMSG.CONFIRMED, token);
    }

    @Post(':userId/guest')
    async addGuestToUser(
        @Param('userId') userId: string,
        @Body() guestDTO: GuestDTO
    ) {
        const { available, subscriptionID, ...user } = await new Promise<IUser>((resolve, reject) => {
            this._clientProxyUser.send(UserMSG.FIND_ONE, userId)
                .subscribe({
                    next: user => resolve(user),
                    error: err => reject(err),
                });
        });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if (!available) throw new HttpException('User not available', HttpStatus.BAD_REQUEST);

        if (subscriptionID === undefined) throw new HttpException('User does not have a subscription assigned', HttpStatus.BAD_REQUEST);

        const guests = await new Promise<IGuest[]>((resolve, reject) => {
            this._clientProxyGuest.send(GuestMSG.FIND_BY_USER_ID, user._id)
                .subscribe({
                    next: guests => resolve(guests),
                    error: err => reject(err)
                });
        });

        if (guests.length + 1 > subscriptionID.numberOfGuests) throw new HttpException('User is not allowed to add a new guest due to their subscription', HttpStatus.BAD_REQUEST);

        const guest = await new Promise<IGuest>((resolve, reject) => {
            this._clientProxyGuest.send(GuestMSG.CREATE, { userId, guestDTO })
                .subscribe({
                    next: user => resolve(user),
                    error: err => reject(err)
                });
        });

        const email = guest.email;
        const confirmationToken = guest.confirmationToken;

        const { status } = await new Promise<any>((resolve, reject) => {
            this._clientProxyEmail.send(EmailMSG.CONFIRMATION, { email, confirmationToken })
                .subscribe({
                    next: status => resolve(status),
                    error: err => reject(err)
                });
        });

        if (!status) {
            await this._clientProxyGuest.send(GuestMSG.DELETE, guest._id);
            throw new HttpException('Error sending confirmation email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return guest;
    }

    @Post(':userId/event')
    async addEventToUser(
        @Param('userId') userId: string,
        @Body() eventDTO: EventDTO
    ) {
        const { available, subscriptionID, ...user } = await new Promise<IUser>((resolve, reject) => {
            this._clientProxyUser.send(UserMSG.FIND_ONE, userId)
                .subscribe({
                    next: user => resolve(user),
                    error: err => reject(err),
                });
        });

        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if (!available) throw new HttpException('User not available', HttpStatus.BAD_REQUEST);

        if (subscriptionID === undefined) throw new HttpException('User does not have a subscription assigned', HttpStatus.BAD_REQUEST);

        return this._clientProxyEvent.send(EventMSG.CREATE, { userId, eventDTO });
    }

    @Put(':userId/subscription/:subscriptionId')
    async assignedSubscription(
        @Param('userId') userId: string,
        @Param('subscriptionId') subscriptionId: string
    ) {
        const { available, ...subscription } = await new Promise<ISubscription>((resolve, reject) => {
            this._clientProxySubscription.send(SubscriptionMSG.FIND_ONE, subscriptionId)
                .subscribe({
                    next: subscription => resolve(subscription),
                    error: err => reject(err),
                });
        });
        if (!subscription) throw new HttpException('Subscription Not Found', HttpStatus.NOT_FOUND);
        if (!available) throw new HttpException('Subscription not available', HttpStatus.BAD_REQUEST);

        return this._clientProxyUser.send(UserMSG.ASSIGNED_SUB, { userId, subscriptionId });
    }

    @Put(':id/avatar')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(
        @Param('id') id: string,
        @UploadedFile() file
    ) {

        const user = await this._clientProxyUser.send(UserMSG.FIND_ONE, id);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const extensions = ['jpg', 'jpeg', 'png'];
        const route = ['user', id, 'avatar'];
        const avatar = await new Promise<IFile>((resolve, reject) => {
            this._clientProxyUploadFile.send(UploadFileMSG.UPLOAD, { file, route, extensions })
                .subscribe({
                    next: avatar => resolve(avatar),
                    error: err => reject(err),
                });
        });

        return await this._clientProxyUser.send(UserMSG.UPLOAD_AVATAR, { id, avatar });
    }
    
}