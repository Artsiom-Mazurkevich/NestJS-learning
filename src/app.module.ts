import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { ArticleModule } from './article/article.module'
import * as process from 'process'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ttl: 1,
                limit: 3,
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => ({
                uri: process.env.DATABASE_URL,
            }),
        }),
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        CloudinaryModule,
        ArticleModule,
        ProfileModule,
    ],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
