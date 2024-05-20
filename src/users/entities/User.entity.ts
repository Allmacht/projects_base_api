import { Column, CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './Photo.entity';
import { Exclude } from 'class-transformer';
import { Languages } from '../enums/languages.enum';
import { AuthProviders } from '../enums/auth_providers.enum';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false })
	names: string;

	@Column({ nullable: false })
	lastName: string;

	@Column({ unique: true, nullable: false })
	email: string;

	@Column({ default: true, nullable: false })
	isActive: boolean;

	@Column({ nullable: false })
	@Exclude()
	password: string;

	@Column({ nullable: true })
	phone: string;

	@Column({
		type: 'enum',
		enum: Languages,
		default: Languages.Spanish,
		nullable: false,
	})
	languange: Languages;

	@Column({
		type: 'enum',
		enum: AuthProviders,
		nullable: false,
		default: AuthProviders.Local,
	})
	authProvider: AuthProviders;

	@Column({ nullable: true })
	authProviderId: string;

	@OneToMany(() => Photo, (photo) => photo.user)
	photos: Photo[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}
