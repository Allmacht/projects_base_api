import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';

@Injectable()
export class EmailValidator {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async isEmailUnique(email: string): Promise<boolean> {
		const existingUser = await this.userRepository.findOne({
			where: { email },
		});
		return !existingUser;
	}
}
