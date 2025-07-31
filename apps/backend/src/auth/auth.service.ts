import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { SignUpInput, SignInInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
import { AuthProvider } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(input: SignUpInput): Promise<AuthResponse> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await this.usersService.create({
      ...input,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ userId: user.id });

    return {
      token,
      user,
    };
  }

  async signIn(input: SignInInput): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id });

    return {
      token,
      user,
    };
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }

  async validateOAuthLogin(profile: any, provider: AuthProvider): Promise<AuthResponse> {
    const { email, googleId, name } = profile;

    // Check if user exists with this Google ID
    let user = await this.usersService.findByGoogleId(googleId);

    if (!user) {
      // Check if user exists with this email
      user = await this.usersService.findByEmail(email);

      if (user) {
        // User exists with email but not linked to Google, link it
        user = await this.usersService.update(user.id, {
          googleId,
          provider,
        });
      } else {
        // Create new user
        user = await this.usersService.createOAuthUser({
          email,
          googleId,
          name,
          provider,
        });
      }
    }

    const token = this.jwtService.sign({ userId: user.id });

    return {
      token,
      user,
    };
  }
}
