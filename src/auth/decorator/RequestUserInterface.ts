import mongoose from 'mongoose'

export interface RequestUser {
    _id: mongoose.Schema.Types.ObjectId
    email: string
    username: string
}
