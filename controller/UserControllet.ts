// import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";
import { DBcridential } from "../DBconfigure.ts";


const client = new Client(DBcridential)



const queryTest = async({response},{response:any})=>{

    try {
        await client.connect();
        await client.execute(`USE nqudb`);
    
        let result = await client.execute(`SELECT * from test;`)
        console.log(result)
    
        response.status=200
        response.body= result

    } catch (error) {
        response.status=500
        response.body="failed"
    }
}

const userStore = async({request,response}:{request:any,response:any})=>{
    response.body='meowhecker'
}


export {queryTest, userStore}



