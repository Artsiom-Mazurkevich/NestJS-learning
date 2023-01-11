import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ArticleDto } from './dto/articleDto'
import { InjectModel } from '@nestjs/mongoose'
import { Article, ArticleDocument } from '../schemas/article.schema'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { PaginateModel } from 'mongoose'

// import { Model } from 'mongoose'

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name) private articleModel: PaginateModel<ArticleDocument>,
        private cloudinary: CloudinaryService
    ) {}
    async createArticle(article: ArticleDto, user: any, file: Express.Multer.File) {
        let imageUrl = null

        if (file) {
            imageUrl = await this.cloudinary.uploadImage(file)
        }

        const newArticle = await this.articleModel.create({
            title: article.title,
            text: article.text,
            authorId: user._id,
            authorName: user.username,
            imageUrl: imageUrl,
        })
        return newArticle
    }
    async getOneArticle(id: string) {
        if (id) {
            // const article = await this.articleModel.findOne({ _id: id })
            const article = await this.articleModel.findByIdAndUpdate({ _id: id }, { $inc: { viewsCount: 1 } })
            return article
        }
    }
    async getAllArticles(page: number = 1, limit: number = 5) {
        const articlesCount = await this.articleModel.paginate({}, { page, limit }, function (err, result) {
            // result.docs
            // result.total
            // result.limit - 10
            // result.page - 3
            // result.pages
        })
        return articlesCount
    }

    async getDefaultCountArticles() {
        const articles = await this.articleModel.paginate(
            {},
            { page: 1, limit: 5, sort: { createdAt: -1 } },
            (err, result) => {
                if (err) throw new InternalServerErrorException()
            }
        )
        return articles
    }
}
