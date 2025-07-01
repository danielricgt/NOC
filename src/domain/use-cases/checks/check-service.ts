interface CheckServiceUseCase {
    execute(url: string): Promise<boolean> 
}

type SucessCallback = () => void;
type FailCallback = (error: string) => void;
export class CheckService implements CheckServiceUseCase {

    constructor(
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
            this.sucessCallBack();
            return true;
        } catch (error) {
            this.failCallBack(" "+ error)
                console.log(error)
        }       return false;
    } 
}