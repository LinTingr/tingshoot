const canvas = document.querySelector("#canvas")
const context  = canvas.getContext("2d");
const ownScore = document.querySelector(".ownScore")
const ownScorebar = document.querySelector(".ownScorebar")


class ScoreBall {
    constructor (x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        // console.log('tank xpos:',this.xpos,'tank ypos:',this.ypos);
        // context.beginPath();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        context.fill();
    }
    update() {
        this.draw()
    }
}
class ScoreTriangle {
    constructor (x, y, size, color){
        this.x = x;
        this.y = y;
        this.size = size
        this.color = color;
    }
    draw(){
        context.beginPath();
        context.fillStyle = this.color
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.size, this.y);
        context.lineTo(this.x + this.size / 2, this.y + this.size * Math.sqrt(3) / 2);
        context.closePath();
        context.fill();
    }
    update() {
        this.draw()
    }
}
// //設定視窗大小
let window_width = 1200;
let window_height = 800;
canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#cdcdcd";

// const x = canvas.width/2
// const y = canvas.height/2
let players = {}
let bullets = []
let scoreTriangle =[]
let scoreballs = [] 
let score = 0 


socket.on("scoreball",(x)=>{
    // console.log(x)
    if(scoreballs.length<10){
        for(let i = 0; i < x.length; i++){
            scoreballs.push(new ScoreBall(x[i][0], x[i][1], 20, "#ffe869"))
        }
    }
})
// function scoreObject(X){
//     setInterval(()=>{
//         if (scoreballs.length < 5) {
//             const ballX = Math.floor(Math.random() * (1200 - 20 + 1) + 20);
//             const ballY = Math.floor(Math.random() * (800 - 20 + 1) + 20);
//             // scoreTrangle.push(new ScoreTrangle())    
//             scoreballs.push(new ScoreBall(ballX, ballY, 20, "#ffe869"))
//         }
//         // if(scoreTriangle.length < 1){
//         //     const triangleX = Math.floor(Math.random() * (1200 - 20 + 1) + 20);
//         //     const triangleY = Math.floor(Math.random() * (800 - 20 + 1) + 20);
//         //     scoreTriangle.push(new ScoreTriangle(triangleX, triangleY, 100, "#fc7677"))
//         // }
//     },1000) 
// }

function projectile(){
    addEventListener("click", (event)=>{ 
        let rect = canvas.getBoundingClientRect();
        let xx = event.clientX - rect.left;
        let yy = event.clientY - rect.top;
        let angle = Math.atan2(yy - figure.ypos, xx - figure.xpos);
        let bullet = new Bullet(
            figure.xpos+50*Math.cos(angle), 
            figure.ypos+50*Math.sin(angle), 
            10, 
            angle, 
            {x:Math.cos(angle)*6,y:Math.sin(angle)*6});
        socket.emit("bullets", bullet)
        bullets.push(bullet);
        console.log(bullets)
    }) 
}



function palyermove(){
    if (aPressed) { 
        figure.xpos = (figure.xpos > figure.radius) ? figure.xpos - figure.speed : figure.radius;
    } 
    if (wPressed) { 
        figure.ypos = (figure.ypos > figure.radius) ? figure.ypos - figure.speed : figure.radius;
    }     
    if (dPressed) { 
        figure.xpos = (figure.xpos < canvas.width - figure.radius) ? figure.xpos + figure.speed : canvas.width - figure.radius;
    }     
    if (sPressed) { 
        figure.ypos = (figure.ypos < canvas.height - figure.radius) ? figure.ypos + figure.speed : canvas.height - figure.radius;
    }  
}

function mousemove(){
    let angle
    addEventListener("mousemove", function(event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        angle = Math.atan2(y - figure.ypos, x - figure.xpos);
        // 計算物件與滑鼠之間的角度
        figure.angle = angle; // 更新物件角度
    });
}

let abc 
socket.on("update", (playinfo)=>{
    context.clearRect(0, 0, canvas.width, canvas.height);       
    for(let id in playinfo){
            if(id !== socket.id){
                players[id] = new Figure(playinfo[id].name, playinfo[id].x, playinfo[id].y, 25, "mediumpurple", 2.5, playinfo[id].angle)
                abc = players[id]
            }
        }
})
socket.on("bullet", (otherbullets)=>{
    let bullet = new Bullet(otherbullets.x, otherbullets.y, otherbullets.radius, otherbullets.angle, otherbullets.speed)
    bullets.push(bullet)
})
function startgame(){
    context.clearRect(0, 0, canvas.width, canvas.height);

//////////////////////////////////////////////////////////////////////////////////////
    bullets.forEach(function(bullet){
        bullet.update();
    })
    // otherbullets.forEach(function(bullet){
    //     console.log("otherbullets", otherbullets)
    //     bullet.update();
    // })
    scoreTriangle.forEach(function(triangle, triangleindex){
        triangle.update();
        const distToTriangleCenter = Math.hypot(figure.xpos - triangle.x, figure.ypos - triangle.y);
        // console.log(distToTriangleCenter)
        // const d = Math.sqrt((triangle.x - triangle.y) ** 2 + (figure.xpos - figure.ypos) ** 2);
        // const dist1 = Math.hypot(figure.xpos - triangle.x, figure.ypos - triangle.y);
        // const dist2 = Math.hypot(figure.xpos - (triangle.x + triangle.size), figure.ypos - triangle.y);
        // const dist3 = Math.hypot(figure.xpos - (triangle.x + triangle.size / 2), figure.ypos - (triangle.y + triangle.size * Math.sin(Math.PI / 3)));
        if (distToTriangleCenter < figure.radius + triangle.size / 2) {
            console.log("碰撞");
        }
        // if(dist1 < triangle.size || dist2 < triangle.size || dist3 < triangle.size){
        //     console.log("碰撞")
        // }
//////////////////////////////////////////////////////////////////////////////////////
        bullets.forEach(function(bullet, bulletindex){
            // const distToTriangleCenter = Math.hypot(bullet.x - triangle.x, bullet.y - triangle.y);
            // console.log(distToTriangleCenter)
            const dist1 = Math.hypot(bullet.x - triangle.x, bullet.y - triangle.y)
            const dist2 = Math.hypot(bullet.x - (triangle.x + triangle.size ), bullet.y - triangle.y);
            const dist3 = Math.hypot(bullet.x -(triangle.x + triangle.size / 2 ), bullet.y - (triangle.y + triangle.size * Math.sin(Math.PI / 3)));
            // if (distToTriangleCenter < bullet.radius + triangle.size / 2) {
            //     bullets.splice(bulletindex, 1)
            //     scoreTriangle.splice(triangleindex, 1)
            // }
            if (dist1 < triangle.size/2 || dist2 < triangle.size/2 || dist3 < triangle.size/2){
                bullets.splice(bulletindex, 1)
                scoreTriangle.splice(triangleindex, 1)
                socket.emit("ballclear", scoreballs)
            }
        })
    })
//////////////////////////////////////////////////////////////////////////////////////
    
    scoreballs.forEach(function(ball, ballindex){
        ball.update();
        const dist = Math.hypot(figure.xpos - ball.x, figure.ypos - ball.y)
        if(dist- ball.radius - figure.radius < 1){
            console.log("碰撞")
        }
        bullets.forEach(function(bullet, bulletindex){
            const dist = Math.hypot(bullet.x - ball.x, bullet.y - ball.y)
            if (dist - ball.radius - bullet.radius < 1){
                bullets.splice(bulletindex, 1)
                scoreballs.splice(ballindex, 1)
                //分數
                score += 10
                ownScore.innerText = score
                // 分數條
                let scorebar = parseInt(ownScorebar.style.width)
                scorebar += 10/10
                if (scorebar >= 297){
                    scorebar = 297
                }
                ownScorebar.style.width = scorebar+"px"
                console.log(scorebar)

                // console.log(score)
            }
        })
    })

    figure.draw()
    // 傳資料到伺服端
    socket.emit("playinit", {
        name:user.username,
        x: figure.xpos,
        y: figure.ypos, 
        radius:25, 
        color:"black", 
        speed:2.5, 
        angle:figure.angle
    }) 
    

    // 資料傳到客戶端
    if(typeof(abc)=="object"){
        abc.draw()
    }

    palyermove();
    mousemove();
    requestAnimationFrame(startgame);
}

// socket.on("bullet", (bullet)=>{
//     console.log(bullet)
//     // let bbbb = new Bullet(abc.xpos+50*Math.cos(abc.angle), abc.ypos+50*Math.sin(abc.angle), 10, abc.angle, {x:Math.cos(abc.angle)*6,y:Math.sin(abc.angle)*6});
//     bullets.push(bullet);
// })