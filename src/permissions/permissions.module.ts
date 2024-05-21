import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { PermissionsController } from './permissions.controller';
import { RolesController } from './roles.controller';
import { PermissionsService } from './permissions.service';
import { RolesService } from './roles.service';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [UsersModule, TypeOrmModule.forFeature([Role, Permission])],
	controllers: [RolesController, PermissionsController],
	providers: [RolesService, PermissionsService],
})
export class PermissionsModule {}
