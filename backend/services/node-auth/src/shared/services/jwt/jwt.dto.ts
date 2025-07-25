import { UserRole } from "src/modules/login/login.dto";

export class TokenGenerateDto {
    id: number;
    role: UserRole;
}