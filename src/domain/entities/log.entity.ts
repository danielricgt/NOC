
export enum LogSeverityLevel{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions  {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
}

export class LogEntity{


    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor(options: LogEntityOptions)
{
    this.message = options.message;
    this.level = options.level;
    this.origin = options.origin;
    this.createdAt = new Date();

}

static fromJson = (json: string):LogEntity => {
    const {message, level, createdAt, origin} = JSON.parse(json);

    const log = new LogEntity({message, level, origin, createdAt});

    return log;

}
}