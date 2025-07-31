import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    try {
      // Check if Google OAuth is properly configured
      const clientID = this.configService.get('GOOGLE_CLIENT_ID');
      if (!clientID || clientID === 'your-google-client-id-here' || clientID === 'dummy-client-id') {
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        return res.redirect(`${frontendUrl}/auth/signin?error=oauth_not_configured`);
      }

      // req.user contains the Google profile data from the strategy
      const { token, user } = await this.authService.validateOAuthLogin(req.user, 'GOOGLE');
      
      // Redirect to frontend with token
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&provider=google`);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      // Redirect to frontend with error
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
      const errorMessage = (error as Error)?.message === 'Google OAuth not configured. Please run ./scripts/setup-google-oauth.sh' 
        ? 'oauth_not_configured' 
        : 'oauth_failed';
      res.redirect(`${frontendUrl}/auth/signin?error=${errorMessage}`);
    }
  }
}