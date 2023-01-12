import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Article, ArticleSchema } from '../schemas/article.schema'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'

@Module({
    providers: [ArticleService],
    controllers: [ArticleController],
    imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]), CloudinaryModule],
})
export class ArticleModule {}
