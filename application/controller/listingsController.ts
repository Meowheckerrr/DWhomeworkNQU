
import * as view from "../View/listingsView.ts"
import { sqliteDB, listingsQuery } from "../Model/listingModel.ts"

//Listings Controller


async function listings(ctx:any){

    let user:any = await ctx.state.session.get('user')


    const UserData = listingsQuery("select * from userListings ")
 
    ctx.response.body = await view.listings(UserData,user)
}


async function show(ctx:any){
    //fetch URL parameter 
        const parameterID = ctx.params.id
        let userListings = sqliteDB.listingsQuery(`select * from userListings where id = ${parameterID}`)
        const singleUserData = userListings[0]  
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
        sqliteDB.listingsQuery("insert into userListings (name, createAt, description)values (?, ?, ?)",[newUserObject.name, newUserObject.createAt, newUserObject.description])
        ctx.response.redirect("/")
    }
   
}


export {listings,show,create,store}