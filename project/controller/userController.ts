

import { sqliteDB } from "../Model/listingModel.ts"

import { query } from "../Model/userModel.ts"

import * as view from "../View/userView.ts"


const userMap = {
    meowhecker:{userName:"meowhecker",password:"meowhecker"},
    meowmeow:{userName:"meowmeow",password:"meowmeow"}
}


async function parseForm(body){
    const formDatas = await body.value
    const object:any = {}

    for(const [key,value] of formDatas){
        object[key] = value
    }
    console.log("parseForm=",object)
    return object
}


async function login(ctx){
    ctx.response.body = await view.loginPage
}


async function Authenticate(ctx:any){
    const body = ctx.request.body()
    if (body.type === "form" ){
        var user = await parseForm(body)
        console.log("loginInfo="+ user.userName)

        var DBuser = userMap[user.userName]  //  userName(form)<--->userName(dictionary)
        
        console.log("match userName=" + DBuser)

        if(DBuser.password === user.password){
            await ctx.state.session.set('user', user)
            console.log('session.user=', await ctx.state.session.get('user'))
            ctx.response.redirect('/');
        }else{
            ctx.response.body = 'Login Fail ><'
        }
       
    }

}
async function logout(ctx){
    await ctx.state.session.set('user', null)
    ctx.response.redirect('/')
 }


 async function signup(ctx){
     ctx.response.body =  await view.signupPage
    
 }


 async function store(ctx){
    // console.log(-2)
    const body = ctx.request.body()
    // console.log(-1)
    if(body.type =="form"){
        const userForm = await parseForm(body)
        //Check use must be unique
        const DBuser = sqliteDB.query(`select id, name, password, email from users where name='${userForm.name}'`)
        // console.log(0)
        if(DBuser.length===0){
            sqliteDB.query("insert into users (name, password, email) values (?, ?, ?)", [userForm.name, userForm.password, userForm.email])
            // console.log(1)
            ctx.response.body = view.signupSuccuse
        }else{
            ctx.response.body = view.signupFail
            // console.log(2)
        }
    }
 }

export {login, Authenticate,logout,signup,store} 