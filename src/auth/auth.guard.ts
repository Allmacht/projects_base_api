import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}

	/**
	 * Checks if a route is public or protected
	 * @param context The execution context of the route
	 * @returns A promise that resolves to a boolean indicating if the route is public or not
	 */
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// Check if the route is decorated with @Public
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			// If the route is public, return true
			return true;
		}

		// If the route is protected, extract the token from the request
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			// If no token is present, throw an UnauthorizedException
			throw new UnauthorizedException();
		}
		try {
			// Verify the token using the JWT secret
			const payload = await this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});

			// If the token is valid, set the user on the request object
			request['user'] = payload;
		} catch {
			// If the token is invalid, throw an UnauthorizedException
			throw new UnauthorizedException();
		}
		// If the token is valid, return true
		return true;
	}

	/**
	 * Extracts the token from the Authorization header
	 * @param request The incoming request
	 * @returns The token if present, or undefined if not
	 */
	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
