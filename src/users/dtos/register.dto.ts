import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { UserDto } from './user.dto';
import { Type } from 'class-transformer';

export class RegisterDto {
	@IsNotEmpty()
	@IsObject()
	@ValidateNested()
	@Type(() => UserDto)
	user: UserDto;
}
