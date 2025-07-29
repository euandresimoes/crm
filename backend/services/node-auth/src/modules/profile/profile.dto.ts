import { UserRole } from "../login/login.dto";

export class ProfileResponseDto {
    id: number;
    username: string;
    display_name: string;
    email: string;
    email_verified: boolean;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}