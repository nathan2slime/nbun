import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

import 'reflect-metadata'

import { AppModule } from '~/app/app.module'
import {
  AllExceptionsFilter,
  HttpExceptionFilter
} from '~/app/filters/http-expection'
import { redisClient } from '~/database/redis'
import { env } from '~/env'
import { logger } from '~/logger'

const main = async () => {
  const app = await NestFactory.create(AppModule)

  await redisClient.connect()

  app.use(cookieParser())
  app.enableCors({
    credentials: true,
    origin: env.APP_URL
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      validateCustomDecorators: true
    })
  )
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new AllExceptionsFilter(httpAdapter)
  )

  const config = new DocumentBuilder().setTitle('NBUN').build()

  app.setGlobalPrefix('api')

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(env.PORT, () => {
    logger.info(
      'running in http://localhost:'.concat(env.PORT).concat('/api/health')
    )

    logger.info(
      'docs in http://localhost:'.concat(env.PORT).concat('/api/docs')
    )
  })
}

main()
