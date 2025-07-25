import { IsEmail, Matches } from "class-validator"

export class UserLoginRequestDto {
    @IsEmail()
    email: string;

    @Matches(/^[a-zA-Z*@_.!]+$/)
    password: string;
}

export class UserLoginResponseDto {
    status: number;
    access_token: string;
}

export enum UserRole {
    user = "user",
    support = "support",
    admin = "admin"
}