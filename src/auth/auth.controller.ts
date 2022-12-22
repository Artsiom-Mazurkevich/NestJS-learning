import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signup(@Body() body: any) {
        return this.authService.signup(body.password, body.email)
    }

    @Post('signin')
    login() {
        return this.authService.login()
    }
}
