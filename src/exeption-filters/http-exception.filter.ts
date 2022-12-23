// import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
// import { Request, Response } from 'express'
//
// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp()
//         const response = ctx.getResponse<Response>()
//         const request = ctx.getRequest<Request>()
//         const status = exception.getStatus()
//         const message = exception.message
//         const method = request.method
//
//
//         response.status(status).json({
//             message,
//             statusCode: status,
//             path: request.url,
//             method,
//             timestamp: new Date().toISOString(),
//         })
//     }
// }

// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
// import { HttpAdapterHost } from '@nestjs/core'
//
// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//     constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
//
//     catch(exception: unknown, host: ArgumentsHost): void {
//         // In certain situations `httpAdapter` might not be available in the
//         // constructor method, thus we should resolve it here.
//         const { httpAdapter } = this.httpAdapterHost
//
//         const ctx = host.switchToHttp()
//
//         const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
//
//         const responseBody = {
//             statusCode: httpStatus,
//             timestamp: new Date().toISOString(),
//             path: httpAdapter.getRequestUrl(ctx.getRequest()),
//         }
//
//         httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
//     }
// }

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    private readonly logger: Logger
    constructor() {
        this.logger = new Logger()
    }
    catch(exception: Error, host: ArgumentsHost): any {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()

        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const message = exception instanceof HttpException ? exception.message : 'Internal server error'

        const devErrorResponse: any = {
            statusCode,
            message: exception?.message,
            path: request.url,
            method: request.method,
            errorName: exception?.name,
            timestamp: new Date().toISOString(),
        }

        const prodErrorResponse: any = {
            statusCode,
            message,
            path: request.url,
            method: request.method,
            errorName: exception?.name,
            timestamp: new Date().toISOString(),
        }
        this.logger.log(`request method: ${request.method} request url${request.url}`, JSON.stringify(devErrorResponse))
        response.status(statusCode).json(process.env.NODE_ENV === 'development' ? devErrorResponse : prodErrorResponse)
    }
}
