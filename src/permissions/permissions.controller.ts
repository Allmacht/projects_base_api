import { Controller, Get, HttpCode, HttpStatus, Post, Body, UseInterceptors, Delete, Param } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionDto } from './dtos/permission.dto';
import { TransformPermissionInterceptor } from './interceptors/permission.interceptor';

@Controller('auth/permissions')
export class PermissionsController {
	constructor(private readonly permissionsService: PermissionsService) {}

	@Get('/')
	@UseInterceptors(TransformPermissionInterceptor)
	@HttpCode(HttpStatus.OK)
	async getPermissions(): Promise<PermissionDto[]> {
		return await this.permissionsService.getPermissions();
	}

	@Post('create')
	@UseInterceptors(TransformPermissionInterceptor)
	@HttpCode(HttpStatus.CREATED)
	async createPermission(@Body() permission: PermissionDto) {
		return await this.permissionsService.createPermission(permission);
	}

	@Delete('delete/:uuid')
	@HttpCode(HttpStatus.OK)
	async deletePermission(@Param('uuid') uuid: string): Promise<void> {
		return await this.permissionsService.deletePermission(uuid);
	}
}
