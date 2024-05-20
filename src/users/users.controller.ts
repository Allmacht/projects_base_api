import { Controller, Post, Body, HttpCode, UseInterceptors, HttpStatus } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { User } from './entities/User.entity';
import { TransformUserInterceptor } from './interceptors/user.interceptor';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Public()
	@UseInterceptors(TransformUserInterceptor)
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() registerDto: RegisterDto): Promise<User> {
		return await this.usersService.register(registerDto);
	}
}
