import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as client from 'prom-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // <-- Prometheus config
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();
  // -->

  // <-- Swagger config
  const config = new DocumentBuilder()
    .setTitle('v1/auth')
    .setVersion('v1')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  // -->

  // <-- Morgan config
  app.use(morgan('dev'));
  // -->

  await app.listen(process.env.PORT ?? 7001);
}
bootstrap();
