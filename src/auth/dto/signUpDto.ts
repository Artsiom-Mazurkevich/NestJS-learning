import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    username: string
}

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}