import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleHasPermissions } from './entities/role_has_permissions.entity';

@Injectable()
export class RoleHasPermissionService {
	constructor(
		@InjectRepository(RoleHasPermissions) private roleHasPermissionRepository: Repository<RoleHasPermissions>,
	) {}

	// assignPermissionToRole(roleId: string, { permissionId }: { permissionId: string }): Promise<RoleHasPermissions> {
	// }
}
