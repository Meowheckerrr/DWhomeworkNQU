import { sqliteDB } from "../Model/listingModel.ts"
import { userQuery,userMap} from "../Model/userModel.ts"
import * as view from "../View/userView.ts"





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


        // Query user info from the table
        var DBuserViaTable =userQuery(`select id, name, password, email from users where name='${user.userName}'`)
            console.log("userLogin and username is",{DBuserViaTable})


        // var DBuserViaDictory = userMap[user.userName]  //  userName(form)<--->userName(dictionary)
     
        if(DBuserViaTable[0] == null){ //Avoid:  error(Cannot read properties of undefined (reading 'password')
            ctx.response.body = 'Login Fail ><  請先申請成偉我的手下' 
        } else{

            if(DBuserViaTable[0].password === user.password){
                await ctx.state.session.set('user', user)
                console.log('session.user=', await ctx.state.session.get('user'))
                ctx.response.redirect('/');
            }else{
                ctx.response.body = 'Login Fail ><'
            }

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
            sqliteDB.query("insert into users (name, password, email) values (?, ?, ?)", [userForm.userName, userForm.password, userForm.email])
            console.log(sqliteDB.query(`select * from users`))
            ctx.response.body = view.signupSuccuse
        }else{
            ctx.response.body = view.signupFail
            // console.log(2)
        }
    }
 }
























export {login, Authenticate,logout,signup,store} 