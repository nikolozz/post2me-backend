import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const whitelist = configService.get('FRONTEND_URL').split(',');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error(`${origin} Not allowed by CORS, allowed ${whitelist.join(',')}`))
      }
    },
    credentials: true,
    exposedHeaders: 'Authentication',
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();
