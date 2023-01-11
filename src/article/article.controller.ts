import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleDto } from './dto/articleDto'
import { GetUser, RequestUser } from '../auth/decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from '../auth/guard'

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}
    @Post()
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() article: ArticleDto, @GetUser() user: RequestUser, @UploadedFile() file: Express.Multer.File) {
        return this.articleService.createArticle(article, user, file)
    }

    @Get(':id')
    getOneArticle(@Param('id') id: string) {
        return this.articleService.getOneArticle(id)
    }

    @Get()
    getDefaultCountArticles() {
        try {
            return this.articleService.getDefaultCountArticles()
        } catch (e) {
            console.log('some error: ', e)
        }
    }

    @Get()
    getAllArticles(@Query('page', ParseIntPipe) page?: number, @Query('limit', ParseIntPipe) limit?: number) {
        try {
            return this.articleService.getAllArticles(page, limit)
        } catch (e) {
            console.log('some error: ', e)
        }
    }
}
