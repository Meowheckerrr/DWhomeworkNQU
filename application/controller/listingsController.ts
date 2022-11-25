
import * as view from "../View/listingsView.ts"
import { sqliteDB, listingsQuery,insertQuery } from "../Model/listingModel.ts"
import { userQuery } from "../Model/userModel.ts"

//Listings Controller


async function listings(ctx:any){

    let user:any = await ctx.state.session.get('user')


    const listingData = listingsQuery("select * from userListings ")
    const userData = userQuery("select * from users ")

    console.log("user name =",userData.name)
 
    ctx.response.body = await view.listings(listingData,userData,user)
}


async function show(ctx:any){
    //fetch URL parameter 
        const parameterID = ctx.params.id
        let userListings = listingsQuery(`select * from userListings where id = ${parameterID}`)
        const singleUserData = userListings[0]  
        console.log("singleuserdata =", singleUserData)
        if(!singleUserData){
            ctx.throw(404,"invalid ID")
        }else{
            ctx.response.body = await view.listingPage(singleUserData)
        }
}

async function create(ctx:any){
    ctx.response.body = await view.CreatePage()

}

async function store(ctx:any){

    //check session stauts 
    var user = await ctx.state.session.get('user')

    const body = ctx.request.body()

    if(body.type === 'form'){
        const parse = await body.value
         console.log(user)
            
         //parse Form 
            const newUserObject:any={}
            for( const [key,value] of parse ) {
                newUserObject[key] = value
            }

        console.log("FormValue =",newUserObject)

        insertQuery(newUserObject)
        
        ctx.response.redirect("/")
    }
   
}


export {listings,show,create,store}