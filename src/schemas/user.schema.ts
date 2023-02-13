import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ _id: true, timestamps: true, versionKey: false })
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ unique: true, required: true })
    username: string

    @Prop({ default: null })
    avatar?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
