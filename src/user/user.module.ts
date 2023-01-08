import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Article, ArticleSchema } from '../schemas/article.schema'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'

@Module({
    controllers: [UserController],
    imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]), CloudinaryModule],
})
export class UserModule {}
