import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleHasPermissions } from './entities/role_has_permissions.entity';
import { RoleDto } from './dtos/role.dto';
import { AddPermissionToRoleDto } from './dtos/add_permission_to_role.dto';
import { PermissionsService } from './permissions.service';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role) private roleRepository: Repository<Role>,
		@InjectRepository(RoleHasPermissions)
		private readonly permissionsService: PermissionsService,
	) {}

	async getRoles(): Promise<Role[]> {
		return await this.roleRepository.find();
	}
	/**
	 * Creates a new role in the database.
	 * @param role The data of the role to be created.
	 * @returns A Promise that resolves to the created role entity.
	 * @throws ConflictException if the role already exists.
	 */
	async createRole(role: RoleDto): Promise<Role> {
		const roleExists = await this.findRoleByName(role.name);
		if (roleExists) {
			throw new ConflictException('Role already exists');
		}
		return await this.roleRepository.save(role);
	}

	async assignPermissionToRole(roleId: string, { permissionId }: AddPermissionToRoleDto): Promise<Role> {
		const role = await this.findRoleById(roleId);
		if (!role) {
			throw new ConflictException('Role not found');
		}

		const permission = await this.permissionsService.findPermissionById(permissionId);
		if (!permission) {
			throw new ConflictException('Permission not found');
		}

		return role;
	}

	async findRoleById(id: string): Promise<Role> {
		return await this.roleRepository.findOneBy({ id });
	}
	/**
	 * Finds a role in the database by its name.
	 * @param name The name of the role to be found.
	 * @returns A Promise that resolves to the found role entity.
	 */
	async findRoleByName(name: string): Promise<Role> {
		return await this.roleRepository.findOneBy({ name: name });
	}
}
