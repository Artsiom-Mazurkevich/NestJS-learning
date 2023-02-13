import { Controller, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { GetUser, RequestUser } from '../auth/decorator'
import { ProfileService } from './profile.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}
    @Put('/photo')
    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('image'))
    updateUserPhoto(@GetUser() user: RequestUser, @UploadedFile() file: Express.Multer.File) {
        return this.profileService.updateUserPhoto(user._id, file)
    }
}
