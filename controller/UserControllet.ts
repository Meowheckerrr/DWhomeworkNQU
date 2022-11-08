// import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";
import { DBcridential } from "../config.ts";


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

// @desc    Store information of register.
// @route   POST:/ 

const userStore = async({request,response}:{request:any,response:any})=>{
   
    let resp = await fetch("http://localhost:5000/signup")

    // console.log(resp.status); // 200
    // console.log(resp.headers.get("Content-Type")); // "text/html"

    const body = `{"name": "email"}`;
    resp = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
     body,
    });

    response.body=body

}


export {queryTest, userStore}



