import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { User, UserDocument } from '../schemas/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: AuthDto) {
        //check if such user exists
        const candidate = await this.userModel.findOne({ email: dto.email })
        if (candidate) {
            throw new BadRequestException('User with this email already exists')
        }
        //generate password hash
        const hash = await argon.hash(dto.password)
        //save new user in the database
        const newUser = await this.userModel.create({ email: dto.email, password: hash })
        //return the saved user
        return await newUser.save().then((doc: UserDocument) => ({
            _id: doc._id,
            email: doc.email,
        }))
    }

    async signin(dto: AuthDto) {
        const findUser = await this.userModel.findOne({ email: dto.email })
        if (!findUser) {
            throw new ForbiddenException('Credentials incorrect')
        }
        const passMatches = await argon.verify(findUser.password, dto.password)
        if (!passMatches) {
            throw new ForbiddenException('Credentials incorrect')
        }
        return this.signToken(findUser._id, findUser.email)
    }

    async signToken(userId: UserDocument['_id'], email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, { expiresIn: '1h', secret })
        return {
            access_token: token,
        }
    }

    // async signup(email: string, password: string): Promise<User> {
    //     const candidate = await this.userModel.findOne({ email })
    //     if (candidate) {
    //         throw new BadRequestException('User with this email already exists')
    //     }
    //     const saltOrRounds = 8
    //     const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    //     const createdUser = new this.userModel({ email, password: hashedPassword })
    //     return await createdUser.save()
    // }

    // async login() {
    // const user = await this.userModel.findOne({ email })
    // if (user) {
    //     //check if password matches
    //     const result = compareSync(password, user.password)
    //     if (result) {
    //         // sign token and send it in response
    //         const token = sign({ email, id: user._id }, process.env.JWTSECRET as Secret, { expiresIn: '1h' })
    //         res.json({ token })
    //     } else {
    //         res.status(400).json({ error: "password doesn't match" })
    //     }
    // } else {
    //     throw new BadRequestException("User doesn't exist")
    // }
    // }
}
