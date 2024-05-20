import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseInterceptors, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dtos/role.dto';
import { TransformRoleInterceptor } from './interceptors/role.interceptor';
import { Role } from './entities/role.entity';
import { AddPermissionToRoleDto } from './dtos/add_permission_to_role.dto';

@Controller('auth')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Get('roles')
	@UseInterceptors(TransformRoleInterceptor)
	@HttpCode(HttpStatus.OK)
	async getRoles(): Promise<Role[]> {
		return this.rolesService.getRoles();
	}

	@Post('roles/create')
	@UseInterceptors(TransformRoleInterceptor)
	@HttpCode(HttpStatus.CREATED)
	async createRole(@Body() role: RoleDto): Promise<Role> {
		return this.rolesService.createRole(role);
	}

	@Post('roles/assign_permissions/:uuid')
	@UseInterceptors(TransformRoleInterceptor)
	@HttpCode(HttpStatus.OK)
	async assignPermissionToRole(
		@Body() permission: AddPermissionToRoleDto,
		@Param('uuid') roleId: string,
	): Promise<Role> {
		return await this.rolesService.assignPermissionToRole(roleId, permission);
	}

	@Post('roles/assign_user/:uuid')
	@HttpCode(HttpStatus.OK)
	async assignRoleToUser() {
		// TODO
	}
}
