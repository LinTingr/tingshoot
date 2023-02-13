/////////////////////////////////////////////////////////////////////////////////
// 註冊
const signUp = document.querySelector(".signUp")
const userSignUpNick = document.querySelector(".userSignUpNick")
const userSignUpAccount = document.querySelector(".userSignUpAccount")
const userSignUpPassword = document.querySelector(".userSignUpPassword")

signUp.addEventListener("click", ()=>{
    const userdata = {
        "name" : userSignUpNick.value,
        "account" : userSignUpAccount.value,
        "password" : userSignUpPassword.value
    }
    console.log(userdata)
    fetch("/api/user",{
        method:"POST",
        body:JSON.stringify(userdata),
        headers:{
            "Content-type": "application/json"
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
    })
})
/////////////////////////////////////////////////////////////////////////////////
// 登入註冊切換
const clickChangeSignup = document.querySelector(".clickChangeSignup")
const clickChangeSignin = document.querySelector(".clickChangeSignin")
const signinFrame = document.querySelector(".signinFrame")
const signupFrame = document.querySelector(".signupFrame")
clickChangeSignup.addEventListener("click", ()=>{
    signinFrame.style.display = "none"
    signupFrame.style.display = ""
})
clickChangeSignin.addEventListener("click", ()=>{
    signinFrame.style.display = ""
    signupFrame.style.display = "none"
})
/////////////////////////////////////////////////////////////////////////////////
// 登入
const userAccount = document.querySelector(".userAccount")
const userPassword = document.querySelector(".userPassword")
const signIn = document.querySelector(".signIn")
const gameMenuFrame = document.querySelector(".gameMenuFrame")

const gameUi = document.querySelector(".gameUi");
const gamestart = document.querySelector(".gamestart");
const to = document.querySelector(".to");

let user 
signIn.addEventListener("click", ()=>{
    const userdata = {
        "account" : userAccount.value,
        "password" : userPassword.value
    }
    console.log(userdata)
    fetch("/api/user",{
        method:"PUT",
        body:JSON.stringify(userdata),
        headers:{
            "Content-type": "application/json"
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        if (data.ok){
            gameMenuFrame.style.display = "none"
            user = data.user
        }
        console.log(data)
    })
})
/////////////////////////////////////////////////////////////////////////////////
let figure

gamestart.addEventListener("click", ()=>{
    gameUi.style.display = "none" ;
    to.style.display = "" ;

    figure = new Figure(user.username, canvas.width/2, canvas.height/2, 25, "mediumpurple", 2.5, 0)
    startgame()
    projectile()
    // scoreObject()

})
/////////////////////////////////////////////////////////////////////////////////
