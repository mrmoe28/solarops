export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthUser extends User {
    token: string;
}
export interface UserSession {
    userId: string;
    email: string;
    expiresAt: Date;
}
//# sourceMappingURL=user.d.ts.map