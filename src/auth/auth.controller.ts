import { Controller, HttpCode, Post, Body, Get, Request, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign_in.dto';
import { TransformUserInterceptor } from '../users/interceptors/user.interceptor';
import { UsersService } from '../users/users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private usersService: UsersService,
	) {}

	/**
	 * Signs in a user using the given email and password.
	 * Returns a JSON Web Token (JWT) that can be used to authenticate
	 * subsequent requests.
	 * @param signInDto The credentials of the user to sign in.
	 * @returns A JSON Web Token that can be used to authenticate future requests.
	 */
	@Public()
	@Post('token')
	@HttpCode(HttpStatus.OK)
	async signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
		return await this.authService.signIn(signInDto);
	}

	/**
	 * Retrieves the profile of the currently authenticated user.
	 * @param req The HTTP request, which contains the user's id.
	 * @returns A Promise that resolves to the user's profile.
	 */
	@UseInterceptors(TransformUserInterceptor)
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	async profile(@Request() req): Promise<any> {
		return await this.usersService.findOneById(req.user.id);
	}
}
