import { Injectable } from '@nestjs/common'
import { User, UserDocument } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async signup(email: string, password: string): Promise<User> {
        const createdUser = new this.userModel({ email, password })
        return createdUser.save()
    }
    login() {
        return 'I logged in'
    }
}
