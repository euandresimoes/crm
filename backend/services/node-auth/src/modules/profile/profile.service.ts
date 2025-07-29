import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { ProfileResponseDto } from './profile.dto';

@Injectable()
export class ProfileService {

    constructor(
        private prisma: PrismaClient
    ) { }

    async profile(
        userId: string | number
    ): Promise<ProfileResponseDto> {
        const user = await this.prisma.user.findUnique({ where: { id: Number(userId) } });
        if (!user)
            throw new HttpException('Account not found.', HttpStatus.NOT_FOUND);

        return user as ProfileResponseDto;
    }

}
