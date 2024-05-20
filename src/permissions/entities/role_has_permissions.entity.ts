import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity({ name: 'role_has_permissions' })
export class RoleHasPermissions {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Role, (role) => role.permissions)
	@JoinColumn({ name: 'roleId' })
	role: Role;

	@ManyToOne(() => Permission, (permission) => permission.roles)
	@JoinColumn({ name: 'permissionId' })
	permission: Permission;
}
