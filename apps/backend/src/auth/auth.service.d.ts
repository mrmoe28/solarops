import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { SignUpInput, SignInInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
import { AuthProvider } from '@prisma/client';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(input: SignUpInput): Promise<AuthResponse>;
    signIn(input: SignInInput): Promise<AuthResponse>;
    validateUser(userId: string): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string | null;
        googleId: string | null;
        provider: import("@prisma/client").$Enums.AuthProvider;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    validateOAuthLogin(profile: any, provider: AuthProvider): Promise<AuthResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map