import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'permissions' })
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false })
	name: string;

	@Column({ nullable: false })
	description: string;

	@ManyToMany(() => Role, (role) => role.permissions)
	roles: Role[];
}
