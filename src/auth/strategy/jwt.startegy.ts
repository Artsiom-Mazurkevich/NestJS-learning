import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from '../../schemas/user.schema'
import { Document, Model } from 'mongoose'

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, @InjectModel(User.name) private userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        })
    }
    async validate(payload: { sub: string; email: string; iat: number; exp: number }) {
        const user: Document<User> | null = await this.userModel.findOne({ _id: payload.sub })
        // @ts-ignore
        delete user._doc.password
        // @ts-ignore
        delete user._doc.createdAt
        // @ts-ignore
        delete user._doc.updatedAt
        return user
    }
}
