import { FactoryProvider } from "@nestjs/common";
import Redis from "ioredis";

export const redisProvider: FactoryProvider = {
    provide: Redis,
    useFactory: () => new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379
    })
}