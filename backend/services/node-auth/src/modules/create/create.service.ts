import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { UserCreateDto } from './create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateService {

    constructor(
        private prisma: PrismaClient
    ) { }

    async create(
        data: UserCreateDto
    ): Promise<void> {
        const emailExists = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (emailExists)
            throw new HttpException('Email already in use.', HttpStatus.CONFLICT);

        const phoneNumberExists = await this.prisma.user.findUnique({ where: { phone_number: data.phone_number } });
        if (phoneNumberExists)
            throw new HttpException('Phone number already in use.', HttpStatus.CONFLICT);

        const username = this.generateUsername();
        const hashedPassword = await bcrypt.hash(data.password, 12);

        await this.prisma.user.create({
            data: {
                ...data,
                username,
                password: hashedPassword
            }
        });
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
