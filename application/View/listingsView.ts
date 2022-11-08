import { layout } from "./layout.ts"



// Display listings on page 
function listings(personalInfoAssociatArray,sessionStatus){

  let list:any = []


  //Using loop to fetch eache element in javascript object 
    for(let userListings of personalInfoAssociatArray){
      
        list.push(`
        <li>
          <h2>Name: ${userListings.name} was created by ${sessionStatus.userName}大人</h2>
          <p><a href="/listing/${userListings.id}">personal Information</a></p>
        </li>
        `)
    }

 

  //Embedding personal information 
    const content =  
      `<h1>Posts</h1>
      <p>${(sessionStatus==null)?'<a href="/login">Login</a> to Create a Post!':'Welcome '+sessionStatus.userName+', You may <a href="/create">Create a Post</a> or <a href="/logout">Logout</a> !'}</p>
      <p>You have <strong>${personalInfoAssociatArray.length}</strong> posts!</p>
      <ul id="posts">
        ${list.join('\n')}
      </ul>
      `
      return layout("post",content)

}

//Show single listing 

  function listingPage(singlepersonalData){
    return layout("single listing",`
    <h1>Name: ${singlepersonalData[1]}</h1>   <!--Show Name-->
    <pre>Time: ${singlepersonalData[2]}</pre>  <!--Show time-->
    <pre>Description: ${singlepersonalData[3]}</pre>  <!-- Show Descripton -->
    `)
  }


//Create Page 

  function CreatePage(){
    return layout("New",`<h1>New Post</h1>
    <p>Create a new post.</p>
    <form action="/store" method="post">
      <p><input type="text" placeholder="name" name="name"></p>

      <label for="createAt"></label>
      <input type="datetime-local" id="createAt"
      name="createAt" value="2022-11-12T19:30"
      min="2022-06-07T00:00" max="2040-06-14T00:00">

      <!--<p><input type="text" placeholder="password" name="password"></p>-->
      <p><textarea placeholder="description" name="description"></textarea>
      <p><input type="submit" value="Create"></p>
    </form>`)
  }


export{layout, CreatePage, listings, listingPage}



// list.join()
//   Definition and Usage
//   The join() method returns an array as a string.
//   The join() method does not change the original array.
//   Any separator can be specified. The default is comma (,).
