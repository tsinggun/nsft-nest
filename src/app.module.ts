import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { APP_INTERCEPTOR , APP_FILTER} from '@nestjs/core';
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    AppService, 
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }, 
    { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})

export class AppModule {}
