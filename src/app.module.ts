import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/'),
        AuthModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}
