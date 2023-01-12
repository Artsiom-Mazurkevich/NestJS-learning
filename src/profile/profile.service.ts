import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { User, UserDocument } from '../schemas/user.schema'

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private cloudinary: CloudinaryService
    ) {}
    async updateUserPhoto(userId: string, file: Express.Multer.File) {
        const avatarUrl = await this.cloudinary.uploadImage(file)
        const updatedUser = await this.userModel
            .findByIdAndUpdate({ _id: userId }, { avatar: avatarUrl }, {})
            .select({ password: 0 })
        return updatedUser
    }
}
