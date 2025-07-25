import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './create.dto';
import { CreateService } from './create.service';

@Controller('v1/auth/create')
export class CreateController {

    constructor(
        private service: CreateService
    ) { }

    @Post()
    async create(
        @Body() data: UserCreateDto
    ): Promise<void> {
        return this.service.create(data);
    }

}
