import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dtos/sign_in.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../users/bcrypt.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private bcryptService: BcryptService,
	) {}

	/**
	 * Signs in a user and returns a JWT token
	 * @param email The user's email
	 * @param password The user's password
	 * @returns A Promise that resolves to an object with the JWT token
	 */
	async signIn({
		email,
		password,
	}: SignInDto): Promise<{ access_token: string; token_type: string; expires_in: number }> {
		// Find the user in the database by their email
		const user = await this.usersService.findOne(email);
		// If the user is not found or is not active, throw an exception
		if (!user || !user.isActive) {
			throw new UnauthorizedException();
		}
		// Compare the provided password with the user's password in the database
		const passwordValid = await this.bcryptService.comparePassword(password, user.password);
		// If the passwords do not match, throw an exception
		if (!passwordValid) {
			throw new UnauthorizedException();
		}
		// Create a payload with the user's id
		const payload = { sub: user.id };
		// Generate a JWT token with the payload
		return {
			access_token: await this.jwtService.signAsync(payload),
			token_type: 'Bearer',
			expires_in: 10800,
		};
	}
}
