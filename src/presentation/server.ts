import { env } from "process";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogPepositoyImpl } from "../infraestructure/repository/log/log.repository,impl";
import { CronService } from "./cron/cron-service";
import { envs } from "../config/plugins/env.plugins";
import { EmailService } from "./email/email.service";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogPepositoyImpl((new FileSystemDataSource));
const sentMail = new EmailService();
export class Server{
    public static start () {
        console.log('server started');
        // console.log(envs);

        new sendEmailLogs(sentMail, fileSystemLogRepository).execute(['danielricardogt@gmail.com', 'drgalvan@davivienda.com'])
        // sentMail.sendEmailWithFileSystemLogs(['danielricardogt@gmail.com', 'drgalvan@davivienda.com'])

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //         const url = 'https://google.com'
        //        new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log('success ' + url + ' is OK'),
        //         (error) => console.log(error)
        //        ).execute(url);
        //     }


        // );
        
    }
}; 