import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/User.entity';
import { Photo } from './users/entities/Photo.entity';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Role } from './permissions/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: process.env.DATABASE_TYPE as 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: [User, Photo, Role, Permission],
			synchronize: true,
		}),
		UsersModule,
		AuthModule,
		PermissionsModule,
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
