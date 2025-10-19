import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger(AppModule.name);

  app.set('trust proxy', true);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = config.getOrThrow<number>('HTTP_PORT');
  const host = config.getOrThrow<string>('HTTP_HOST');

  try {
    await app.listen(port);

    logger.log(`🚀 Server is running at: ${host}`);
    logger.log(`📄 Documentation is available at: ${host}/docs`);
  } catch (error) {
    logger.error(`❌ Failed to start server: ${error.message}`, error);
    process.exit(1);
  }
}

bootstrap();
