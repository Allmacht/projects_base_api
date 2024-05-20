import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleDto } from './dtos/role.dto';
import { AddPermissionToRoleDto } from './dtos/add_permission_to_role.dto';
import { PermissionsService } from './permissions.service';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Role) private roleRepository: Repository<Role>,
		private readonly permissionsService: PermissionsService,
	) {}

	/**
	 * Retrieves all roles from the database, along with their associated permissions.
	 * @returns A Promise that resolves to an array of Role entities.
	 */
	async getRoles(): Promise<Role[]> {
		return await this.roleRepository.find({ relations: ['permissions'] });
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

	/**
	 * Assigns a permission to a role in the database.
	 * If the role or permission does not exist, throws a ConflictException.
	 *
	 * @param roleId The ID of the role to assign the permission to.
	 * @param {AddPermissionToRoleDto} dto - The DTO containing the permission ID to be assigned.
	 * @returns A Promise that resolves to the updated role entity.
	 * @throws ConflictException if the role or permission does not exist.
	 */
	async assignPermissionToRole(roleId: string, { permissionId }: AddPermissionToRoleDto): Promise<Role> {
		// Find the role by ID with its associated permissions
		const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });

		// If the role does not exist, throw a ConflictException
		if (!role) {
			throw new ConflictException('Role not found');
		}

		// Find the permission by ID
		const permission = await this.permissionsService.findPermissionById(permissionId);

		// If the permission does not exist, throw a ConflictException
		if (!permission) {
			throw new ConflictException('Permission not found');
		}

		// Add the permission to the role's permissions array, ensuring there are no duplicates
		const permissions = [...new Set([...role.permissions, permission])];

		// Update the role's permissions array
		role.permissions = permissions;

		// Save the updated role entity to the database
		await this.roleRepository.save(role);

		// Return the updated role entity
		return role;
	}

	/**
	 * Finds a role in the database by its ID.
	 * @param id The ID of the role to be found.
	 * @returns A Promise that resolves to the found role entity.
	 */
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
