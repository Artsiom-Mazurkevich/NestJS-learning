import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from './user.schema'

export type ArticleDocument = HydratedDocument<Article>

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Article {
    @Prop()
    title: string

    @Prop()
    text: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    authorId: User

    @Prop()
    authorName: string

    @Prop({ default: 0 })
    viewsCount: number

    @Prop()
    imageUrl: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
