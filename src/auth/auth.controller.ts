import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserDTO } from '@/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    async signIn(@Req() req) {
        return await this.authService.signIn(req.user);
    }

    @Post('sign-up')
    async signUp(@Body() userDTO: UserDTO) {
        return await this.authService.signUp(userDTO);
    }
}
