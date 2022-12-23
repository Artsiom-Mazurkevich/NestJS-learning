import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { AuthService } from './auth.service'
import { HttpErrorFilter } from '../exeption-filters/http-exception.filter'
import { AuthDto } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @UseFilters(new HttpErrorFilter())
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @UseFilters(new HttpErrorFilter())
    login(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}
