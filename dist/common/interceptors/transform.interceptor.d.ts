import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export interface Response<T> {
    code: number;
    data: T;
    msg: string;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, T | Response<T>> {
    private readonly reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T | Response<T>>;
}
