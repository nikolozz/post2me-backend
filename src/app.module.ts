import Joi = require('@hapi/joi');
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostsModule } from './posts/posts.module';
import { AwsModule } from './aws/aws.module';
import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
import { NotificationsModule } from './notifications/notifications.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AwsModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        PORT: Joi.number().required(),
        FRONTEND_URL: Joi.string().required(),
        PUBLIC_BUCKET: Joi.string().required(),
        THROTTLER_TTL: Joi.number().required(),
        THROTTLER_LIMIT: Joi.number().required(),
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('THROTTLER_TTL'),
        limit: configService.get('THROTTLER_LIMIT'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    PostsModule,
    FilesModule,
    CommentsModule,
    VotesModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
