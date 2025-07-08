import { env } from "process";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogPepositoyImpl } from "../infraestructure/repository/log/log.repository,impl";
import { CronService } from "./cron/cron-service";
import { envs } from "../config/plugins/env.plugins";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogPepositoyImpl((new FileSystemDataSource));

export class Server{
    public static start () {
        console.log('server started');
        // console.log(envs);

        // const sentMail = new EmailService(fileSystemLogRepository);
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