import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenGenerateDto } from './jwt.dto';

const secret = process.env.JWT_SECRET as string;

@Injectable()
export class JwtService {

    generate(data: TokenGenerateDto): string {
        return jwt.sign(
            { role: data.role },
            secret,
            { algorithm: 'HS256', expiresIn: '30d', issuer: 'auth', subject: data.id.toString() }
        );
    }

}
