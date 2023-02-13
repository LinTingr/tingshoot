const express = require("express");
const app = express();
const path = require('path');
const httpServer = require("http").createServer(app);
const {Server} = require("socket.io")
const userRoute = require("./route/apiUser")


// app.get("/",function(req, res){
//     res.render("index")
// })

app.set('view engine', 'ejs')
app.use(express.static('static')) // 靜態路徑
app.use(express.json())
app.use("/api/user", userRoute)


const io = new Server(httpServer)
app.get('/', (req, res)=>{  // 首頁 / 登入畫面
    // res.sendFile(path.resolve(__dirname, './views/index'));
    res.render("index")
})

const messages = []
let playinfo = {}
let clients = []
io.on('connection', (socket)=>{
    // let clientId = socket.id;
    // clients[clientId] = socket;
    console.log("a user connected", socket.id);
    socket.on("playinit",(data)=>{
        playinfo[socket.id] = data;
        // io.emit("update", playinfo)
        socket.broadcast.emit("update", playinfo) //傳資料到前端
    })
    socket.on("bullets", (bullets)=>{
        // console.log(bullets)
        socket.broadcast.emit("bullet", bullets)
    })
   
    io.emit("allMessage", messages)
    socket.on("sendMessage", function (message) {
        console.log(message)
        messages.push(message)
        io.emit("allMessage", message)
    })
   
    socket.on("mousemove", (angle)=>{
        io.emit("mousemove", angle)
    })
    
    socket.on('disconnect', ()=>{
        console.log('A user disconnected:', socket.id);
        delete playinfo[socket.id];
        io.emit('disconnected', socket.id);
    })

    

})
let scoreballs = []
function scoreball(){
    setInterval(()=>{
        if (scoreballs.length < 5) {
            const ballX = Math.floor(Math.random() * (1200 - 20 + 1) + 20);
            const ballY = Math.floor(Math.random() * (800 - 20 + 1) + 20);
            scoreballs.push([ballX, ballY])
        }
    }, 3000)
    io.emit("scoreball", scoreballs)
    if(scoreballs.length == 5){
        scoreballs = []
    }
    // socket.on("ballclear", (allball)=>{
    //     scoreballs = allball
    // })
}

// setInterval(scoreball, 3000);

httpServer.listen(5000, function(){
    console.log("http://127.0.0.1:5000");
});

// app.listen(3000, function(){
    // console.log("伺服器已經啟動, http://127.0.0.1:3000");
// });