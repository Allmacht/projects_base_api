import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformUserInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => ({
				id: data.id,
				type: 'User',
				attributes: {
					names: data.names,
					lastName: data.lastName,
					email: data.email,
					phone: data.phone,
					avatar: data.avatar,
					isActive: data.isActive,
					lang: data.languange_preference,
					createdAt: data.createdAt,
					updatedAt: data.updatedAt,
				},
			})),
		);
	}
}
