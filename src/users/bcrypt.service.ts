import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
	/**
	 * Hashes the given password using bcrypt with the specified number of salt rounds.
	 * If no salt rounds are specified, 10 is used.
	 * @param password The password to be hashed.
	 * @param saltRounds The number of salt rounds to use. Defaults to 10.
	 * @returns A Promise that resolves to the hashed password.
	 */
	async hashPassword(password: string, saltRounds: number = 10): Promise<string> {
		// Hash the password using bcrypt with the given salt rounds.
		return await bcrypt.hash(password, saltRounds);
	}

	/**
	 * Compares the given plain text password with the hashed password.
	 * @param plainText The plain text password to be compared.
	 * @param hashedPassword The hashed password to be compared against.
	 * @returns A Promise that resolves to a boolean indicating if the passwords match.
	 */
	async comparePassword(plainText: string, hashedPassword: string): Promise<boolean> {
		// Compares the given plain text password with the hashed password.
		// Returns a Promise that resolves to a boolean indicating if the passwords match.
		return await bcrypt.compare(plainText, hashedPassword);
	}
}
