import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../schemas/user.schema'
import { JwtModule } from '@nestjs/jwt'
import { JwtStartegy } from './strategy'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStartegy],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({})],
})
export class AuthModule {}
