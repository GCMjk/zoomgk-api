import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GuestDTO {
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
    @IsEmail()
    readonly email: string;
}