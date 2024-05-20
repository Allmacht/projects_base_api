import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
	@IsNotEmpty()
	names: string;

	@IsNotEmpty()
	lastName: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Length(6, 20)
	password: string;
}
