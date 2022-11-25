
import { layout } from "./listingsView.ts";


function loginPage(){
    return layout("Login Page",`
    
    <h1>Login</h1>

    <form action="/login" method="post">
        <p><input type="text" placeholder="userName" name="userName"></p>
        <p><input type="password" placeholder="password" name="password"></p>
        <p><input type="submit" value="Login"></p>
    </form>
    <p>成為Meowhecker的手下? <a href="/signup">Create an account</p>
    `)
}


function signupPage(){
    return layout("Sign Page", `
    <h1>Signup</h1>
    <form action="/signup" method="post">
        <p><input type="text" placeholder="userName" name="userName"></p>
        <p><input type="password" placeholder="password" name="password"></p>
        <p><input type="text" placeholder="email" name="email"></p>
        <p><input type="submit" value="Signup"></p>
    </form>
  `)
}


function signupSuccuse(){
    return layout('Success', `
    <h1>Success!</h1>
    You may <a href="/">read all Post</a> / <a href="/login">login</a> again !
    `)
}
function signupFail(){
    return layout('Fail', `
    <h1>Fail!</h1>
    You may <a href="/">read all Post</a> or <a href="JavaScript:window.history.back()">go back</a> !
    `)
}

export {loginPage,signupPage,signupSuccuse,signupFail}