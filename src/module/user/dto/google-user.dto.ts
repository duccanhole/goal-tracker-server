import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GoogleUserDto {
    @ApiProperty({ type: String, example: "test@gmail.com" })
    @IsString()
    @IsNotEmpty()
    email: string
    
    @ApiProperty({ type: String, example: "test" })
    @IsString()
    @IsNotEmpty()
    displayName: string

    @ApiProperty({ type: String, example: "7bfyoGWJcCb0I0KV78K55ZNnwO72" })
    @IsString()
    @IsNotEmpty()
    uid: string
}