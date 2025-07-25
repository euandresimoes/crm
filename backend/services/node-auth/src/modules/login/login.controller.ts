import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserLoginRequestDto, UserLoginResponseDto } from './login.dto';

@Controller('v1/auth/login')
export class LoginController {

    constructor(
        private service: LoginService
    ) { }

    @Post()
    async login(
        @Body() data: UserLoginRequestDto
    ): Promise<UserLoginResponseDto> {
        return this.service.login(data);
    }

}
