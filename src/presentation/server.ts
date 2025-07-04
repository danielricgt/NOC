import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogPepositoyImpl } from "../infraestructure/repository/log/log.repository,impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogPepositoyImpl((new FileSystemDataSource));

export class Server{
    public static start () {
        console.log('server started');

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const url = 'https://google.com'
               new CheckService(
                fileSystemLogRepository,
                () => console.log('success ' + url + ' is OK'),
                (error) => console.log(error)
               ).execute(url);
            }


        );
        
    }
}; 