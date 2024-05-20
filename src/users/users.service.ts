import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import { RegisterDto } from './dtos/register.dto';
import { BcryptService } from '../users/bcrypt.service';
import { EmailValidator } from '../users/validators/email.validator';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private readonly bcryptService: BcryptService,
		private readonly emailValidator: EmailValidator,
	) {}

	/**
	 * Finds a user in the database by its email.
	 * @param email The email of the user to be found.
	 * @returns A Promise that resolves to the found user entity.
	 */
	async findOne(email: string): Promise<User> {
		return await this.userRepository.findOneBy({ email });
	}

	/**
	 * Finds a user in the database by its id.
	 * @param id The id of the user to be found.
	 * @returns A Promise that resolves to the found user entity.
	 */
	async findOneById(id: string): Promise<User> {
		return await this.userRepository.findOneBy({ id });
	}

	/**
	 * Registers a new user in the database.
	 * @param registerInput The user data to be registered.
	 * @returns The created user entity.
	 */
	async register(registerInput: RegisterDto): Promise<User> {
		try {
			const { names, lastName, email, password } = registerInput.user;

			// Check if email is unique
			const isEmailUnique = await this.emailValidator.isEmailUnique(email);
			if (!isEmailUnique) {
				throw new ConflictException('Email already exists');
			}

			// Create the new user
			const newUser = this.userRepository.create({
				names,
				lastName,
				email,
				password: await this.bcryptService.hashPassword(password),
			});

			// Save the new user in the database
			return await this.userRepository.save(newUser);
		} catch (error) {
			// Rethrow the error
			throw error;
		}
	}
}
