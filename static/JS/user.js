// /////////////////////////////////////////////////////////////////////////////////
// // 註冊
// const signUp = document.querySelector(".signUp")
// const userSignUpNick = document.querySelector(".userSignUpNick")
// const userSignUpAccount = document.querySelector(".userSignUpAccount")
// const userSignUpPassword = document.querySelector(".userSignUpPassword")

// signUp.addEventListener("click", ()=>{
//     const userdata = {
//         "name" : userSignUpNick.value,
//         "account" : userSignUpAccount.value,
//         "password" : userSignUpPassword.value
//     }
//     console.log(userdata)
//     fetch("/api/user",{
//         method:"POST",
//         body:JSON.stringify(userdata),
//         headers:{
//             "Content-type": "application/json"
//         }
//     }).then((response)=>{
//         return response.json()
//     }).then((data)=>{
//         console.log(data)
//     })
// })
// /////////////////////////////////////////////////////////////////////////////////
// // 登入註冊切換
// const clickChangeSignup = document.querySelector(".clickChangeSignup")
// const clickChangeSignin = document.querySelector(".clickChangeSignin")
// const signinFrame = document.querySelector(".signinFrame")
// const signupFrame = document.querySelector(".signupFrame")
// clickChangeSignup.addEventListener("click", ()=>{
//     signinFrame.style.display = "none"
//     signupFrame.style.display = ""
// })
// clickChangeSignin.addEventListener("click", ()=>{
//     signinFrame.style.display = ""
//     signupFrame.style.display = "none"
// })
// /////////////////////////////////////////////////////////////////////////////////
// // 登入
// const userAccount = document.querySelector(".userAccount")
// const userPassword = document.querySelector(".userPassword")
// const signIn = document.querySelector(".signIn")
// const gameMenuFrame = document.querySelector(".gameMenuFrame")
// signIn.addEventListener("click", ()=>{
//     const userdata = {
//         "account" : userAccount.value,
//         "password" : userPassword.value
//     }
//     console.log(userdata)
//     fetch("/api/user",{
//         method:"PUT",
//         body:JSON.stringify(userdata),
//         headers:{
//             "Content-type": "application/json"
//         }
//     }).then((response)=>{
//         return response.json()
//     }).then((data)=>{
//         if (data.ok){
//             gameMenuFrame.style.display = "none"
//         }
        
//         console.log(data)
//     })
// })