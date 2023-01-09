import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleDto } from './dto/articleDto'
import { GetUser } from '../auth/decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from '../auth/guard'

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}
    @Post()
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() article: ArticleDto, @GetUser() user: any, @UploadedFile() file: Express.Multer.File) {
        return this.articleService.createArticle(article, user, file)
    }

    // @Get(':id')
    // getArticleById(@Query('id') id: string): string {
    //     return `Пост с идентификатором ${id}`
    // }

    @Get()
    getArticleById(@Query('id') id: string) {
        return `Статья с id: ${id}`
    }
}
