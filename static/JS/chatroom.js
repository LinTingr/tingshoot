const chat = document.querySelector(".chat")
const chatroomInterface = document.querySelector(".chatroomInterface")

chat.addEventListener("click", ()=>{
    chatroomInterface.style.display = ""
    chat.style.display = "none"
    console.log("開始聊天")
})