import { AuthService } from './auth.service';
import { SignUpInput, SignInInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
import { User } from '../users/models/user.model';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signUp(input: SignUpInput): Promise<AuthResponse>;
    signIn(input: SignInInput): Promise<AuthResponse>;
    me(user: User): Promise<User>;
}
//# sourceMappingURL=auth.resolver.d.ts.map