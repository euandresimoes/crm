import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { UserLoginRequestDto, UserLoginResponseDto, UserRole } from './login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { MetricsService } from 'src/shared/metrics/metrics.service';
import { MetricAction, MetricMethod, MetricReason, MetricType } from 'src/shared/metrics/metrics.enum';

@Injectable()
export class LoginService {

    constructor(
        private prisma: PrismaClient,
        private jwtService: JwtService,
        private metrics: MetricsService
    ) { }

    async login(
        data: UserLoginRequestDto
    ): Promise<UserLoginResponseDto> {
        /*
         * Checks if account with the given email exists.
         * Logs a failure metric and throws NOT FOUND exception if account not found. 
         */
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user) {
            this.metrics.incOperation(
                MetricAction.Login,
                MetricType.Fail,
                MetricMethod.Post,
                HttpStatus.NOT_FOUND.toString(),
                MetricReason.AccountNotFound
            );
            throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);
        }

        /*
         * Compares given password and stored password.
         * Logs a failure metric and throws FORBIDDEN exception if invalid.
         */
        const passwordMatches = await bcrypt.compare(data.password, user.password);
        if (!passwordMatches) {
            this.metrics.incOperation(
                MetricAction.Login,
                MetricType.Fail,
                MetricMethod.Post,
                HttpStatus.FORBIDDEN.toString(),
                MetricReason.InvalidCredentials
            );
            throw new HttpException('Invalid credentials.', HttpStatus.FORBIDDEN);
        }

        /*
         * Generates a JWT token with user ID and ROLE.
         */
        const token = this.jwtService.generate({
            id: user.id,
            role: user.role as UserRole
        });

        /*
         * Logs a successful login metric
         */
        this.metrics.incOperation(
            MetricAction.Login,
            MetricType.Success,
            MetricMethod.Post,
            HttpStatus.OK.toString(),
            MetricReason.LoginSuccess
        );

        return {
            status: HttpStatus.OK,
            access_token: token
        };
    }
}
