import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { UserCreateDto } from './create.dto';
import * as bcrypt from 'bcrypt';
import { MetricsService } from 'src/shared/metrics/metrics.service';
import { MetricAction, MetricMethod, MetricReason, MetricType } from 'src/shared/metrics/metrics.enum';

@Injectable()
export class CreateService {

    constructor(
        private prisma: PrismaClient,
        private metrics: MetricsService
    ) { }

    async create(
        data: UserCreateDto
    ): Promise<void> {
        /*
         * Checks if there's already an account with the same email to prevent duplicates.
         * Logs a failure and throws a CONFLICT exception if an account is found.
         */
        const emailExists = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (emailExists) {
            this.metrics.incOperation(
                MetricAction.Create,
                MetricType.Fail,
                MetricMethod.Post,
                HttpStatus.CONFLICT.toString(),
                MetricReason.EmailInUse
            );

            throw new HttpException('Email already in use.', HttpStatus.CONFLICT);
        }

        const generatedUsername = this.generateUsername();
        const hashedPassword = await bcrypt.hash(data.password, 12);

        await this.prisma.user.create({
            data: {
                ...data,
                username: generatedUsername,
                password: hashedPassword
            }
        });

        /*
         * Logs a successful account creation metric.
         */
        this.metrics.incOperation(
            MetricAction.Create,
            MetricType.Success,
            MetricMethod.Post,
            HttpStatus.CREATED.toString(),
            MetricReason.AccountCreated
        );
    }


    private generateUsername(): string {
        let username = 'user';

        for (let i = 0; i < 10; i++) {
            const number = Math.floor((Math.random() * 9) + 1);
            username = username + number;
        }

        return username;
    }

}
