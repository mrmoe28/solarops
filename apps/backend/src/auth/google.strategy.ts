import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
    
    // Use actual credentials if available, otherwise use dummy values
    const finalClientID = (!clientID || clientID === 'your-google-client-id-here') ? 'dummy-client-id' : clientID;
    const finalClientSecret = (!clientSecret || clientSecret === 'your-google-client-secret-here') ? 'dummy-client-secret' : clientSecret;
    
    if (finalClientID === 'dummy-client-id') {
      console.warn('⚠️  Google OAuth not configured. Run ./scripts/setup-google-oauth.sh to set up Google OAuth.');
    }
    
    super({
      clientID: finalClientID,
      clientSecret: finalClientSecret,
      callbackURL: configService.get('GOOGLE_CALLBACK_URL', 'http://localhost:4000/auth/google/callback'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // Check if using dummy credentials
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    if (!clientID || clientID === 'your-google-client-id-here' || clientID === 'dummy-client-id') {
      return done(new Error('Google OAuth not configured. Please run ./scripts/setup-google-oauth.sh'), null);
    }

    const { name, emails, photos, id } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      name: name.givenName + ' ' + name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}