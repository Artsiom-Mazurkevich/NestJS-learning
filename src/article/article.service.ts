import { Injectable } from '@nestjs/common'
import { ArticleDto } from './dto/articleDto'
import { InjectModel } from '@nestjs/mongoose'
import { Article, ArticleDocument } from '../schemas/article.schema'
import { Model } from 'mongoose'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
        private cloudinary: CloudinaryService
    ) {}
    async createArticle(article: ArticleDto, user: any, file: Express.Multer.File) {
        const imageUrl = await this.cloudinary.uploadImage(file)

        const newArticle = await this.articleModel.create({
            title: article.title,
            text: article.text,
            authorId: user._id,
            authorName: user.username,
            imageUrl: imageUrl.url,
        })
        return newArticle
    }
}
