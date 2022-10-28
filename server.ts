// import {Server} from "https://deno.land/std@0.161.0/http/server.ts";

// const port = 3000
// const handler = (request: Request)=>{
//     const body = `Your user-agent is:\n\n${request.headers.get(
//         "user-agent",
//        ) ?? "Unknown"}`
     
//     return new Response(body,{status:200})
// }
// const server = new Server({port,handler});


// console.log("server listening on http://localhost:3000");

// await server.listenAndServe();
//<-------------------------------

import { Application, Router } from "https://deno.land/x/oak/mod.ts";

//View
import { showLogin } from "./view/loginPage.ts";
import { homePage } from "./view/homePage.ts";
import { showSchedule } from "./view/schedulePage.ts";


// Router 
const router = new Router()

//Main pages
    router.get("/", homePage)
    router.get("/schedule", showSchedule)
    

//user systems
    // router.get("signup", showSignup)
    router.get("/login", showLogin)



//test
    // router.post("/postTest", store)


//Css
    // router.get("/assets/css/Login-Form-Basic-icons.css")



const app = new Application()

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 5000 });

console.log("server listening on http://localhost:5000");