import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean> 
}

type SucessCallback = (() => void) | undefined;
type FailCallback = ((error: string) => void) | undefined;
export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly sucessCallBack: SucessCallback,
        private readonly failCallBack: FailCallback

    ){

    }
    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok ) {
                throw new Error('Error on check service '+ url)
            }
            const newLogEntity = new LogEntity(`Service ${url} working`, LogSeverityLevel.low )
            this.logRepository.saveLog(newLogEntity);
            this.sucessCallBack && this.sucessCallBack();
            return true;
        } catch (error) {
            const errorMessage = `${url } is not ok ${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.high);
            this.logRepository.saveLog(log)
            this.failCallBack &&  this.failCallBack(" "+ error)
        }       return false;
    } 
}