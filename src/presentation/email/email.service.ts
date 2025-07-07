import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';

// this is my service to send emails and also is my adapter pattern to avoid bad practices

interface SendMailOptions {
    to: string,
    subject: string,
    htmlBody: string,
    // attachmennts
}

export class EmailService {  

    private trasporter  = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions):Promise<boolean> {
        
        const {to, subject, htmlBody} = options;

        try {  

            const sentInformation = await this.trasporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
            });
            console.log(sentInformation);
            return true
        } catch (error) {
            return false;
        }
    }

}