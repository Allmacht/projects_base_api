import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformRoleInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) =>
				data instanceof Array
					? data.map((role) => ({
							id: role.id,
							type: 'Role',
							attributes: {
								name: role.name,
								description: role.description,
							},
							relationships: {
								permissions: {
									data: role.permissions.map((permission) => ({
										id: permission.id,
										type: 'Permission',
										attributes: {
											name: permission.name,
											description: permission.description,
										},
									})),
								},
							},
						}))
					: {
							id: data.id,
							type: 'Role',
							attributes: {
								name: data.name,
								description: data.description,
							},
							relationships: {
								permissions: {
									data: data.permissions.map((permission) => ({
										id: permission.id,
										type: 'Permission',
										attributes: {
											name: permission.name,
											description: permission.description,
										},
									})),
								},
							},
						},
			),
		);
	}
}
