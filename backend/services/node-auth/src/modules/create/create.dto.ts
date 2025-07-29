import { IsEmail, IsString, Matches } from "class-validator";

export class UserCreateDto {
    @IsString()
    @Matches(/^[a-zA-Z ]+$/)
    display_name: string;

    @IsEmail()
    email: string;

    @Matches(/^[a-zA-Z*@_.!]+$/)
    password: string;
}