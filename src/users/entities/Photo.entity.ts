import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'photos' })
export class Photo {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	extension: string;

	@Column({ nullable: false })
	url: string;

	@Column({ nullable: false })
	current: boolean;

	@Column({ nullable: false })
	userId: string;

	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
	})
	user: User;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
