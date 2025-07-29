import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenGenerateDto } from './jwt.dto';
import { secret } from './jwt.secret';

@Injectable()
export class JwtService {

    generate(data: TokenGenerateDto): string {
        return jwt.sign(
            { role: data.role },
            secret,
            { algorithm: 'HS256', expiresIn: '30d', issuer: 'auth-service', subject: data.id.toString() }
        );
    }

    verifyAndReturnPayload(token: string): jwt.JwtPayload {
        const cleanToken = token.replace('Bearer ', '');

        return jwt.verify(cleanToken, secret, { issuer: 'auth-service' }) as jwt.JwtPayload;
    }

}
