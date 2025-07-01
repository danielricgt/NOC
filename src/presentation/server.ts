import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server{
    public static start () {
        console.log('server started');

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const url = 'https://google.com'
               new CheckService(
                () => console.log('success ' + url + ' is OK'),
                (error) => console.log(error)
               ).execute(url);
            }


        );
        
    }
}; 