import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from './bcrypt.service';
import { EmailValidator } from './validators/email.validator';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService, BcryptService, EmailValidator],
	exports: [UsersService, BcryptService],
})
export class UsersModule {}
