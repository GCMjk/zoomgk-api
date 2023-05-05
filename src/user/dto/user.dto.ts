import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
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
    @IsString()
    readonly gender: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly birthday: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}