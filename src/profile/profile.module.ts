import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../schemas/user.schema'

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [CloudinaryModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class ProfileModule {}
