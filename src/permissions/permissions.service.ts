import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionDto } from './dtos/permission.dto';

@Injectable()
export class PermissionsService {
	constructor(
		@InjectRepository(Permission)
		private readonly permissionRepository: Repository<Permission>,
	) {}

	async getPermissions(): Promise<Permission[]> {
		return await this.permissionRepository.find();
	}

	async createPermission(permission: PermissionDto): Promise<Permission> {
		const { name, description } = permission;

		const existingPermission = await this.findPermissionByName(name);
		if (existingPermission) {
			throw new ConflictException('Permission already exists');
		}
		return await this.permissionRepository.save({ name, description });
	}

	async findPermissionByName(name: string): Promise<Permission> {
		return await this.permissionRepository.findOneBy({ name: name });
	}

	async findPermissionById(id: string): Promise<Permission> {
		return await this.permissionRepository.findOneBy({ id });
	}

	async deletePermission(uuid: string): Promise<void> {
		await this.permissionRepository.delete({ id: uuid });
	}
}
