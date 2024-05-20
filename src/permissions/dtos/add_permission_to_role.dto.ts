import { IsUUID, IsNotEmpty } from 'class-validator';

export class AddPermissionToRoleDto {
	@IsNotEmpty()
	@IsUUID()
	permissionId: string;
}
