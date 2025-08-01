import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, User } from 'generated/prisma';
import { ProfileResponseDto } from './profile.dto';
import Redis from 'ioredis';

@Injectable()
export class ProfileService {

    constructor(
        private prisma: PrismaClient,
        private redis: Redis
    ) { }

    async profile(
        userId: string | number
    ): Promise<ProfileResponseDto> {
        const userCache = await this.redis.get(`user:${userId}:profile`);
        if (userCache) {
            const userParsed = JSON.parse(userCache);
            return userParsed as ProfileResponseDto;
        }

        const user = await this.prisma.user.findUnique({ where: { id: Number(userId) } });
        if (!user)
            throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);

        await this.redis.set(
            `user:${user.id}:profile`,
            JSON.stringify(user),
            'EX',
            3600
        );

        return user as ProfileResponseDto;
    }

}
