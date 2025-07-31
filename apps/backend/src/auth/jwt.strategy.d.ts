import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: {
        userId: string;
    }): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string | null;
        googleId: string | null;
        provider: import("@prisma/client").$Enums.AuthProvider;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map