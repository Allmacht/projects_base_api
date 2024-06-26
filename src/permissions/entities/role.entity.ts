import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from 'src/users/entities/User.entity';

@Entity({ name: 'roles' })
export class Role {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false })
	name: string;

	@Column({ nullable: true })
	description: string;

	@ManyToMany(() => Permission, (permission) => permission.roles)
	@JoinTable({
		name: 'role_has_permissions',
		joinColumn: { name: 'roleId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
	})
	permissions: Permission[];

	@ManyToMany(() => User, (user) => user.roles)
	users: User[];
}
