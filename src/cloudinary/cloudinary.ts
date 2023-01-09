import { v2 } from 'cloudinary'
import * as process from 'process'

export const CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        })
    },
}