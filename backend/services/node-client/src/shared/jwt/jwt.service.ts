import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { secret } from './jwt.secret';

@Injectable()
export class JwtService {

    verifyAndReturnPayload(token: string): jwt.JwtPayload {
        const cleanToken = token.replace('Bearer ', '');

        return jwt.verify(cleanToken, secret, { issuer: 'auth-service' }) as jwt.JwtPayload;
    }

}
