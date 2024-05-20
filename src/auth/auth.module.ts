import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from 'src/users/bcrypt.service';
import { jwtConstants } from './constants/constants';
import { TransformUserInterceptor } from 'src/users/interceptors/user.interceptor';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions: { expiresIn: '3600s' } }),
	],
	controllers: [AuthController],
	providers: [AuthService, BcryptService, TransformUserInterceptor, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
