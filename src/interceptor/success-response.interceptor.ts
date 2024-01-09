import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from 'src/common/constants';
import { ISuccessResponse } from 'src/common/interfaces';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ISuccessResponse> {
    const request = context.switchToHttp().getRequest();
    const path = request?.url;

    // Exclude '/add-city' route from interceptor logic
    if (path === `/${Constants.IQAIR_PATH}/${Constants.ADD_CITY}`) {
      return next.handle();
    }

    // Apply interceptor logic for other routes
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        let returnedResponse;
        if (data.data) {
          returnedResponse = { code: res.statusCode, ...data };
        } else {
          returnedResponse = { code: res.statusCode, data: data };
        }

        return returnedResponse;
      }),
    );
  }
}
