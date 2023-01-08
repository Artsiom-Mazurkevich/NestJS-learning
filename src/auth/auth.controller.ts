import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common'
import { AuthService } from './auth.service'
import { HttpErrorFilter } from '../exeption-filters/http-exception.filter'
import { SignInDto, SignUpDto } from './dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @UseFilters(new HttpErrorFilter())
    signup(@Body() dto: SignUpDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @UseFilters(new HttpErrorFilter())
    login(@Body() dto: SignInDto) {
        return this.authService.signin(dto)
    }
}
