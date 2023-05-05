import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsString } from "class-validator";

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
    @IsDate()
    readonly date: Date;

    @ApiProperty({
        type: String,
        isArray: false,
        format: 'mongo-id'
    })
    @IsMongoId()
    readonly user: string;

    @ApiProperty({
        type: [String],
        isArray: true,
        format: 'mongo-id'
    })
    @IsArray()
    @IsMongoId({ each: true })
    readonly guests: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly key: string;
}