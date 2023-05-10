import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

import { GenderEnum, RoleEnum } from "@common/interfaces/user.interface";

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    readonly gender: GenderEnum;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly birthday: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(RoleEnum)
    readonly role: RoleEnum;

}