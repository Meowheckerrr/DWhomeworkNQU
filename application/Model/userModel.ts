import { sqliteDB } from "./listingModel.ts";



const userMap = {
    meowhecker:{userName:"meowhecker",password:"meowhecker"},
    meowmeow:{userName:"meowmeow",password:"meowmeow"}
}




function userQuery(sql){
    const list:any =[]
    for (const [id,name, password, email] of sqliteDB.query(sql)){
        list.push({id,name,password,email})
    }
    return list
}


// function select(){
//     const selectQuery =sqliteDB.userQuery("select * from users ")
// }


// function insert(userForm){
//     const insertQuery = sqliteDB.userQuery("insert into user(name,password,email) values(?,?,?)",[userForm.name,userForm.password,userForm.email])
//     return insertQuery
// }

export{userQuery,userMap}