const express = require("express");
const app = express();
// const path = require('path');
const http = require("http");
const httpServer = http.createServer(app);
const { Server } = require("socket.io")

const userRoute = require("./route/apiUser")

app.get("/",function(req, res){
    res.render("index")
})

app.set('view engine', 'ejs')
app.use(express.static('static')) // 靜態路徑
app.use(express.json())
app.use("/api/user", userRoute)



const io = new Server(httpServer)
// app.get('/', (req, res)=>{  // 首頁 / 登入畫面
//     res.sendFile(path.resolve(__dirname, './views/index.html'));
// })

io.on('connection', (socket)=>{
    console.log("a user connected");
})


httpServer.listen(5000, function(){
    console.log("http://localhost:5000");
});

// app.listen(3000, function(){
//     console.log("伺服器已經啟動, http://127.0.0.1:3000");
// });