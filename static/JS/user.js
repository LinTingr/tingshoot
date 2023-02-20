


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
const ownName = document.querySelector(".ownName")
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
fetch("/api/user").then((response)=>{
    return response.json()
}).then((data)=>{
    if(data.ok){
        console.log(data)
        gameMenuFrame.style.display = "none"
        user = data.user
    }
})
/////////////////////////////////////////////////////////////////////////////////

let figure;
let hp = 120;
let radius = 25;
let damage = 15;
let angle = 0;
let speed = 2.5;
let score = 0;
let exist = false;

gamestart.addEventListener("click", ()=>{
    gameUi.style.display = "none" ;
    to.style.display = "" ;
    ownName.textContent = user.username
    exist = true;
    figure = new Figure(user.username, 
        canvas.width/2, 
        canvas.height/2, 
        radius, 
        "mediumpurple", 
        speed, 
        angle, 
        hp, 
        damage,
        score,
        exist
    )
  
    startgame()
    // scoreObject()
        
})


/////////////////////////////////////////////////////////////////////////////////
