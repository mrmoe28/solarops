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

}
