import { Server } from "./presentation/server";
import { envs } from "../src/config/plugins/env.plugins";


(async()=>{
     main()
})();

function main() {
    Server.start();
    // console.log(envs.PORT)
}