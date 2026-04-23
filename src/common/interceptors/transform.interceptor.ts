import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RAW_RESPONSE } from '../decorators/raw.decorator';

export interface Response<T> {
  code: number;
  data: T;
  msg: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T | Response<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<T | Response<T>> {
    const isRaw = this.reflector.get<boolean>(RAW_RESPONSE, context.getHandler());
    if (isRaw) return next.handle();

    return next.handle().pipe(
      map((data: T) => ({
        code: 200,
        data,
        msg: 'success',
      })),
    );
  }
}
