import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class EventDTO {
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
    @Type(() => Date)
    @IsDate()
    readonly date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly key: string;
}