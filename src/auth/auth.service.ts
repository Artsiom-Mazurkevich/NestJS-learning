import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { User, UserDocument } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { SignInDto, SignUpDto } from './dto'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: SignUpDto) {
        //check if such user exists
        const candidate = await this.userModel.findOne({ email: dto.email })
        if (candidate) {
            throw new BadRequestException('User with this email already exists')
        }
        //generate password hash
        const hash = await argon.hash(dto.password)
        //save new user in the database
        const newUser = await this.userModel.create({ email: dto.email, password: hash, username: dto.username })
        //return the saved user
        return newUser.save().then((doc: UserDocument) => ({
            _id: doc._id,
            email: doc.email,
            username: doc.username,
        }))
    }

    async signin(dto: SignInDto, response: Response) {
        const findUser = await this.userModel.findOne({ email: dto.email })
        if (!findUser) {
            throw new ForbiddenException('Credentials incorrect')
        }
        const passMatches = await argon.verify(findUser.password, dto.password)
        if (!passMatches) {
            throw new ForbiddenException('Credentials incorrect')
        }
        const access_token = await this.signToken(findUser._id, findUser.email)
        response.cookie('auth', access_token, { httpOnly: true, path: '/' })
    }

    async signToken(userId: UserDocument['_id'], email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, { expiresIn: '5h', secret })
        return {
            access_token: token,
        }
    }
}
