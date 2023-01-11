import { Injectable } from '@nestjs/common'
import { v2 } from 'cloudinary'
import toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({ folder: 'blog_platform' }, (error, result) => {
                if (error) return reject(error)
                resolve(result)
            })

            toStream(file.buffer).pipe(upload)
        }).then((res: any) => res.secure_url)
    }
}
