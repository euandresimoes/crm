import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResponseDto } from './profile.dto';
import { JwtGuard } from 'src/shared/jwt/jwt.guard';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('v1/auth/profile')
export class ProfileController {

    constructor(
        private service: ProfileService
    ) { }

    @UseGuards(JwtGuard)
    @Get()
    async profile(
        @User('id') userId: string
    ): Promise<ProfileResponseDto> {
        return this.service.profile(userId);
    }

}
