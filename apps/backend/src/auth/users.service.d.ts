import { PrismaService } from '../database/prisma.service';
import { User, AuthProvider } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        email: string;
        password: string;
        name?: string;
    }): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByGoogleId(googleId: string): Promise<User | null>;
    createOAuthUser(data: {
        email: string;
        googleId: string;
        name: string;
        provider: AuthProvider;
    }): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
}
//# sourceMappingURL=users.service.d.ts.map