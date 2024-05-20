import { IsUUID, IsNotEmpty } from 'class-validator';

export class AddRoleToUserDto {
	@IsUUID()
	@IsNotEmpty()
	userId: string;

	@IsUUID()
	@IsNotEmpty()
	roleId: string;
}
