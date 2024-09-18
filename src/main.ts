import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import 'reflect-metadata';

import { AppModule } from '~/app/app.module';
import { env } from '~/env';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '~/app/filters/http-expection';

(async () => {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.enableCors({
    credentials: true,
    origin: env.APP_URL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new AllExceptionsFilter(httpAdapter),
  );

  const config = new DocumentBuilder().setTitle('nbun').build();

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(env.PORT, () =>
    console.log(
      'running in http://localhost:'.concat(env.PORT).concat('/api/health'),
    ),
  );
})();
