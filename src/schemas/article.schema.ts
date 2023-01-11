import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from './user.schema'
import * as paginate from 'mongoose-paginate'

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

    @Prop({ type: String, default: null })
    imageUrl: string | null
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
ArticleSchema.plugin(paginate)
