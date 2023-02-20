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


socket.on("scoreball",(x)=>{
    // console.log(x)
    if(scoreballs.length<10){
        for(let i = 0; i < x.length; i++){
            scoreballs.push(new ScoreBall(x[i][0], x[i][1], 20, "#ffe869"))
        }
    }
})


let lastShotTime = 0;

function projectile(){
    addEventListener("click", (event)=>{ 
        let currentTime = Date.now();
        // console.log(currentTime)
        let timeDiff = currentTime - lastShotTime;

        if (timeDiff < 350) {
            return;
        }

        let rect = canvas.getBoundingClientRect();
        let xx = event.clientX - rect.left;
        let yy = event.clientY - rect.top;
        let angle = Math.atan2(yy - figure.ypos, xx - figure.xpos);
        let bullet = new Bullet(
            figure.xpos+50*Math.cos(angle), 
            figure.ypos+50*Math.sin(angle), 
            10, 
            angle, 
            {x:Math.cos(angle)*3,y:Math.sin(angle)*3});

        socket.emit("bullets", bullet)
        bullets.push(bullet);
        lastShotTime = currentTime;
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

function addplayer(){
    for(let i in players){
        console.log(players[i])
        let player = players[i]
        player.draw()
    }
}

socket.on("bullet", (otherbullets)=>{
    let bullet = new Bullet(otherbullets.x, otherbullets.y, otherbullets.radius, otherbullets.angle, otherbullets.speed)
    bullets.push(bullet)
})

let playerexist = {} 
let disid 
socket.on("disid", disId=>{
    disid = disId
    console.log(disid)
})


socket.on("update", (playinfo)=>{  
    if (disid in players) {
        console.log(disid)
        delete players[disid]
        console.log("移除成功")
    }  
    for (let id in playinfo) {
        if (id === socket.id) {
            continue;  // 跳過自己的資訊
        }
        if (!playinfo[id].exist) {
            if (id in players) {
                delete players[id];
                console.log("移除成功")
            }
            continue;  // 玩家不存在，跳過該資訊
        }
        if (id in players) {
            const player = players[id];
            if (player.hp > 0) {
                player.xpos = playinfo[id].x;
                player.ypos = playinfo[id].y;
                player.radius = playinfo[id].radius;
                player.speed = playinfo[id].speed;
                player.damage = playinfo[id].damage;
                player.score = playinfo[id].score;
                player.hp = playinfo[id].hp;
                player.angle = playinfo[id].angle;
            } else {
                delete players[id];
                console.log("移除成功")
            }
        } else {
            console.log("建立玩家", id);
            players[id] = new Figure(
                playinfo[id].name, 
                playinfo[id].x, 
                playinfo[id].y, 
                playinfo[id].radius, 
                playinfo[id].color, 
                playinfo[id].speed, 
                playinfo[id].angle, 
                playinfo[id].hp, 
                playinfo[id].damage,
                playinfo[id].score,
                playinfo[id].exist
            );
        }
    }
})
function startgame(){
//////////////////////////////////////////////////////////////////////////////////////
    context.clearRect(0, 0, canvas.width, canvas.height);

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
        if(dist - ball.radius - figure.radius < 1){
            console.log("碰撞")
        }
        bullets.forEach(function(bullet, bulletindex){
            const dist = Math.hypot(bullet.x - ball.x, bullet.y - ball.y)
            if (dist - ball.radius - bullet.radius < 1){
                bullets.splice(bulletindex, 1)
                scoreballs.splice(ballindex, 1)
                //分數
                figure.score += 10
                console.log(figure.score)
                ownScore.innerText = figure.score
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
        name : user.username,
        x : figure.xpos,
        y : figure.ypos, 
        radius : figure.radius, 
        color :"black", 
        speed : figure.speed, 
        angle : figure.angle,
        hp : figure.hp,
        damage : figure.damage,
        score : figure.score,
        exist : figure.exist
    }) 
    

    for(let id in players){
        let player = players[id]
        player.draw()
        bullets.forEach(function(bullet, bulletindex){
            const dist = Math.hypot(player.xpos - bullet.x, player.ypos - bullet.y)
            if (dist - bullet.radius - player.radius < 1) {
                console.log("2, 碰撞")
                player.hp = player.hp - player.damage;
                bullets.splice(bulletindex, 1);
                bulletindex--;
            }
            if(player.hp <= 0){
                console.log("擊殺玩家")
                figure.score += 1000;
                ownScore.innerText = figure.score
                // 分數條
                let scorebar = parseInt(ownScorebar.style.width)
                scorebar += 1000/10
                if (scorebar >= 297){
                    scorebar = 297
                }
                ownScorebar.style.width = scorebar+"px"
            }
        })
    }

    bullets.forEach(function(bullet, bulletindex){
        // console.log(bullets)
        bullet.update();
        // 子彈跑出畫面就刪除子彈
        if(bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height){
            bullets.splice(bulletindex,1);
            bulletindex--;
        }
        const dist = Math.hypot(figure.xpos - bullet.x, figure.ypos - bullet.y)
        if (dist - bullet.radius - figure.radius < 1) {
            console.log("1,碰撞")
            figure.hp = figure.hp - figure.damage;
            bullets.splice(bulletindex, 1);
            bulletindex--;
        }
    })


    if(figure.hp <= 0){
        figure.exist = false
        socket.emit("playerDied", "playerDied:"+figure.name)
        context.clearRect(0, 0, canvas.width, canvas.height);
        gameover()
    }else{
        palyermove();
        mousemove();
        projectile();
    }

    requestAnimationFrame(startgame);
}