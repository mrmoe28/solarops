import type { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    googleAuth(_req: any): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map