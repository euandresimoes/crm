import { Injectable } from '@nestjs/common';
import { Counter, Registry } from 'prom-client';

export const registry = new Registry();

@Injectable()
export class MetricsService {

    private readonly operationCounter: Counter<string>;

    constructor() {
        this.operationCounter = new Counter({
            name: 'http_auth_metrics',
            help: 'total number of HTTP events in Auth Service',
            labelNames: ['action', 'type', 'method', 'status', 'reason'],
            registers: [registry]
        });
    }

    incOperation(
        action: string,
        type: string,
        method: string,
        status: string,
        reason: string
    ): void {
        this.operationCounter.inc({ action, type, method, status, reason });
    }

}
