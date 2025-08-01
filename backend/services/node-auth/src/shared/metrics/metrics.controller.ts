import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { register } from 'prom-client';
import { registry } from './metrics.service';

@Controller('metrics')
export class MetricsController {

    @Get()
    async getMetrics(@Res() res: Response) {
        res.set('Content-Type', register.contentType);
        res.end(await registry.metrics());
    }

}
