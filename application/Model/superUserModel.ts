import { sqliteDB } from "./listingModel.ts";



const superUserMap={
    rootUser1:{userName:"meowking",password:"meowking"}
}



function superUserQuery(sql){
    const list:any =[]
    for (const [id,name, password, email] of sqliteDB.query(sql)){
        list.push({id,name,password,email})
    }
    return list
}
