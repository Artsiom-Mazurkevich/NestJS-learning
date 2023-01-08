import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { ArticleModule } from './article/article.module'
import * as process from 'process'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => ({
                uri: process.env.DATABASE_URL,
            }),
        }),
        AuthModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        CloudinaryModule,
        ArticleModule,
    ],
})
export class AppModule {}
