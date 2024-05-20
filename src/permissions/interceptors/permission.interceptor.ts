import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformPermissionInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) =>
				data instanceof Array
					? data.map((permission) => ({
							id: permission.id,
							type: 'Permission',
							attributes: {
								name: permission.name,
								description: permission.description,
							},
						}))
					: {
							id: data.id,
							type: 'Permission',
							attributes: {
								name: data.name,
								description: data.description,
							},
						},
			),
		);
	}
}
