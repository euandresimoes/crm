import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { UserLoginRequestDto, UserLoginResponseDto, UserRole } from './login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/shared/services/jwt/jwt.service';

@Injectable()
export class LoginService {

    constructor(
        private prisma: PrismaClient,
        private jwtService: JwtService
    ) { }

    async login(
        data: UserLoginRequestDto
    ): Promise<UserLoginResponseDto> {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user)
            throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);

        const passwordMatches = await bcrypt.compare(data.password, user.password);
        if (!passwordMatches)
            throw new HttpException('Invalid credentials.', HttpStatus.FORBIDDEN);

        const token = this.jwtService.generate({
            id: user.id,
            role: user.role as UserRole
        });

        return {
            status: HttpStatus.OK,
            access_token: token
        };
    }

}
