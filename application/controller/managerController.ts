//Use templet module
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";
import { sqliteDB } from "../Model/listingModel.ts";


//Show Mapage Page

    async function managePage(ctx){
        ctx.response.body = await renderFileToString(`../View/manager/managerPage.ejs`,{})
    }



    async function executeSQL(ctx){
        // console.log("exe 1")
        let inputQuery = ctx.params['returnCmd']
        console.log(`Manager Query= ${inputQuery}`)
        
        let executeCmdResult = sqliteDB.query(inputQuery)
        console.log(`query result=${executeCmdResult}`)
        ctx.response.type = 'application/json'
        ctx.response.body = await executeCmdResult
        

    }





export{managePage,executeSQL}