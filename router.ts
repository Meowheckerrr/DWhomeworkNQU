import {Router} from "https://deno.land/x/oak/mod.ts"




//View
import { showLogin } from "./view/loginPage.ts";
import { homePage } from "./view/homePage.ts";
import { showSchedule } from "./view/schedulePage.ts";
import { queryTest, userStore } from "./controller/UserControllet.ts";
import { showSignUP } from "./view/signupPage.ts";





// Router 
const router = new Router()

//Main pages
    router.get("/", homePage)
    router.get("/schedule", showSchedule)
    

//user systems
    // router.get("signup", showSignup)
    router.get("/login", showLogin)
    router.get("/signup", showSignUP)

    router.post("/signup", userStore)

//query
    router.get("/query", queryTest)

//test
    // router.post("/postTest", store)


//Css
    // router.get("/assets/css/Login-Form-Basic-icons.css")



export {router}