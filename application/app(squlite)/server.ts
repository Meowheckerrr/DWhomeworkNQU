import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";
import * as ListingsController from "../controller/listingsController.ts";
import * as UserController from "../controller/userController.ts"
import * as ManagerController from "../controller/managerController.ts"


const port:number = 8201

// Apply sessions to our Oak application

const app = new Application();
  app.use(Session.initMiddleware()); //enable session 

const router:any = new Router()
  app.use(router.routes());
  app.use(router.allowedMethods());
        


// Listings Router 

    router.get("/",           ListingsController.listings)
          .get("/create",     ListingsController.create)
          .get("/listing/:id",ListingsController.show)
          .post("/store",     ListingsController.store)


// User Router

    router.get("/login",   UserController.login)
          .post("/login",  UserController.Authenticate)
          .get("/logout",  UserController.logout)
          .get("/signup",  UserController.signup)
          .post("/signup", UserController.store)

// Database Manerger Router 

    router.get("/manager",      ManagerController.managePage)
    router.get("/execute/:returnCmd", ManagerController.executeSQL)



// Publish Router

  router.get("/public/(.*)", publish)



// Publish controlor
  async function publish(ctx:any){

      console.log(ctx.request.url.pathname)

  }



console.log('start at:http://127.0.0.1:'+port)

await app.listen({port:port})

//.push
    // Definition and Usage
    // The push() method adds new items to the end of an array.
    // The push() method changes the length of the array.
    // The push() method returns the new length.