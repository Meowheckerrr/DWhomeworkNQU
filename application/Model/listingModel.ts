import { DB } from "https://deno.land/x/sqlite/mod.ts";
const sqliteDB = new DB("app.db")


//Create tables

    sqliteDB.execute(`
        create table if not exists
        userListings(
            id integer primary key autoincrement, 
            name text, 
            createAt text,
            description text
        )
    `)


    sqliteDB.execute(`
        create table if not exists
        users(
            id integer primary key autoincrement, 
            name text, 
            password text,
            email text
        )
    `)


    sqliteDB.execute(`
    create table if not exists
    superusers(
        id integer primary key autoincrement, 
        name text, 
        password text,
        email text
    )
`)


function listingsQuery(sqlCommend){
    let list:any = []
    for (const [id, name, createAt, description] of sqliteDB.query(sqlCommend)){
        list.push({id,name,createAt, description})
    }
    return list
}

export{sqliteDB, listingsQuery}
