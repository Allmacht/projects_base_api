import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleHasPermissions } from './entities/role_has_permissions.entity';
import { PermissionsController } from './permissions.controller';
import { RolesController } from './roles.controller';
import { PermissionsService } from './permissions.service';
import { RoleHasPermissionService } from './roleHasPermission.service';
import { RolesService } from './roles.service';

@Module({
	imports: [TypeOrmModule.forFeature([Role, Permission, RoleHasPermissions])],
	controllers: [RolesController, PermissionsController],
	providers: [RolesService, PermissionsService, RoleHasPermissionService],
})
export class PermissionsModule {}
