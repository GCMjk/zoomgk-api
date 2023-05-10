import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class SubscriptionDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDecimal()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly numberOfGuests: number;
}