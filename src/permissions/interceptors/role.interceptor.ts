import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
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
            }))
          : {
              id: data.id,
              type: 'Role',
              attributes: {
                name: data.name,
                description: data.description,
              },
            },
      ),
    );
  }
}
