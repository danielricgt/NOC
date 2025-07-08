import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

// this is my service to send emails and also is my adapter pattern to avoid bad practices

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[];
}

interface Attachment {
    filename: string,
    path: string,
}

export class EmailService {  

    constructor(private readonly LogRepository: LogRepository){
        
    }

    private readonly trasporter  = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions):Promise<boolean> {
        
        const {to, subject, htmlBody, attachments=[]} = options;

        try {  

            const sentInformation = await this.trasporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });
            console.log(sentInformation);
            const log =  new LogEntity({
                level: LogSeverityLevel.low ,
                message: 'attached email send',
                origin: 'EmailService.ts',
            })
            this.LogRepository.saveLog(log);
            return true
        } catch (error) {
            const log =  new LogEntity({
                level: LogSeverityLevel.high ,
                message: 'attached email was not  send',
                origin: 'EmailService.ts',
            })
            this.LogRepository.saveLog(log);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'service logs';
        const htmlBody = `<p>lorem non veiam</p> <h1>Hola</h1> <p>lorem ipsum dolor sit amet</p>`;
        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
        ];
        return  this.sendEmail({to, subject, htmlBody, attachments});

    }



} 