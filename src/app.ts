import { Server } from "./presentation/server";
import { envs } from "../src/config/plugins/env.plugins";
import { LogModel, MongoDataBase } from "./data/mongo";


(async()=>{
     main()
})();

async function main(){
    await MongoDataBase.connect({mongoUrl : envs.MONGO_URL, dbName : envs.MONGO_DB_NAME});
    
    
    //  Server.start();
    // console.log(envs.PORT)
    
    // create a collection
    
    // const newLog = await LogModel.create({
    //     message: 'test message form mongo',
    //     origin: 'App.ts',
    //     level: 'low', 
    // })

    // await newLog.save();

    // console.log(newLog)
    
     const logs = await LogModel.find();
     console.log(logs[0].message);
}
      