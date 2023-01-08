import mongoose from 'mongoose'
import { IsNotEmpty } from 'class-validator'

export class ArticleDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    text: string
    authorId: mongoose.Schema.Types.ObjectId
    authorName: string
    viewsCount: number
    image: Express.Multer.File
}
