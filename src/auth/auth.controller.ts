import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseFilters, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { HttpErrorFilter } from '../exeption-filters/http-exception.filter'
import { SignInDto, SignUpDto } from './dto'
import { GetUser, RequestUser } from './decorator'
import { JwtGuard } from './guard'

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

    @Get('me')
    @UseGuards(JwtGuard)
    getMe(@GetUser() user: RequestUser) {
        return user
    }
}
