import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ExpressAdapter } from '@nestjs/platform-express';

config();

@Catch()
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.NOT_FOUND && !exception.response?.message) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Endpoint not found',
        path: request.url,
      });
    } else {
      console.log(exception);
      response.status(status).json({
        statusCode: status,
        message: exception.response?.message || 'Internal server error',
        path: request.url,
      });
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors();
  app.useGlobalFilters(new NotFoundFilter());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Listening on port ${process.env.PORT ?? 3000}`);
}

bootstrap();
