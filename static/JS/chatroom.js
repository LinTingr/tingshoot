const chat = document.querySelector(".chat");
const chatroomInterface = document.querySelector(".chatroomInterface");
const closeX = document.querySelector(".close");
const chatroomContent = document.querySelector(".chatroomContent")
const chatroomInput = document.querySelector(".chatroomInput")
const chatpic = document.querySelector(".chatpic")
chat.addEventListener("click", ()=>{
    chatroomInterface.style.display = "";
    chat.style.display = "none";
    console.log("開始聊天");
})
addEventListener("keyup", (event)=>{
    if (event.keyCode === 13){
        chatroomInterface.style.display = "";
        chat.style.display = "none";
        console.log("開始聊天");
    }
})

closeX.addEventListener("click", ()=>{
    chatroomInterface.style.display = "none";
    chat.style.display = "";
    chatpic.style.display=""
})

const local = "http://127.0.0.1:5000";
const socket = io(local);
let username ="";

chatroomInput.addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
        if(chatroomInput.value != ""){
            socket.emit("sendMessage", {
                name: user.username,
                message: chatroomInput.value
            })
        }
        //清空輸入欄
        chatroomInput.value =""
    }
  });


socket.on("allMessage", function(message){
    if(message.name){
        chatroomContent.innerHTML += "<div><span>"+message.name+" : </span><span>"+message.message+"</span></div>"
        //滾動條到最底
        chatroomContent.scrollTop = chatroomContent.scrollHeight
        console.log("message", message)
    }

})

