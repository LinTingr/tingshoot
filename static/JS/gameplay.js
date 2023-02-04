const canvas = document.querySelector("#canvas")
const context  = canvas.getContext("2d");
const ownScore = document.querySelector(".ownScore")
const ownScorebar = document.querySelector(".ownScorebar")
// const qqqqqq = "http://localhost:5000";
// const socket = io();
  

class Figure {
    constructor (xpos, ypos, radius, color, speed){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.angle = 0;
    }
    draw(){
        // console.log('tank xpos:',this.xpos,'tank ypos:',this.ypos);
        context.save()
        context.translate(this.xpos, this.ypos);
        context.rotate(this.angle);
        context.beginPath();
        context.fillStyle = "#b7b7b7";
        //砲管
        context.fillRect(15, -10, 30, 20);
        context.strokeRect(15, -10, 30, 20);
        context.strokeRectStyle = "#727272"
        context.lineWidth = 1;
        //人物
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2*Math.PI, false);
        context.fillStyle =  this.color;
        context.fill();
        context.restore()

        // context.stroke();
    }
}
class Bullet {
    constructor(x, y, radius, angle, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.angle = angle;
        this.speed = speed;
        this.damage = 1;
    }
    draw() {
        context.save()
        context.beginPath();
        context.fillStyle = "black"
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore()
    }
    update() {
        this.x = this.speed.x + this.x;
        this.y = this.speed.y + this.y;
        this.draw()
      }
}
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

const figure = new Figure(canvas.width/2, canvas.height/2, 25, "mediumpurple", 2.5)

let wPressed = false;
let dPressed = false;
let sPressed = false;
let aPressed = false;

const x = canvas.width/2
const y = canvas.height/2
const bullets = []

const scoreTriangle =[]
const scoreballs = [] 
let score = 0 

function scoreObject(){
    setInterval(()=>{
        if (scoreballs.length < 5) {
            const ballX = Math.floor(Math.random() * (1200 - 20 + 1) + 20);
            const ballY = Math.floor(Math.random() * (800 - 20 + 1) + 20);
            // scoreTrangle.push(new ScoreTrangle())    
            scoreballs.push(new ScoreBall(ballX, ballY, 20, "#ffe869"))
        }
        // if(scoreTriangle.length < 1){
        //     const triangleX = Math.floor(Math.random() * (1200 - 20 + 1) + 20);
        //     const triangleY = Math.floor(Math.random() * (800 - 20 + 1) + 20);
        //     scoreTriangle.push(new ScoreTriangle(triangleX, triangleY, 100, "#fc7677"))
        // }
    },1000) 
}

function projectile(){
    // let isClicked = false;
    // let ckc = 0 
    addEventListener("click", (event)=>{ 
        // if (isClicked) return;
        // isClicked = true;
        // if(ckc == 0){
        //     let rect = canvas.getBoundingClientRect();
        //     let xx = event.clientX - rect.left;
        //     let yy = event.clientY - rect.top;
        //     let angle = Math.atan2(yy - figure.ypos, xx - figure.xpos);
        //     let bbbb = new Bullet(figure.xpos+50*Math.cos(angle), figure.ypos+50*Math.sin(angle), 10, angle, {x:Math.cos(angle)*3,y:Math.sin(angle)*3});
        //     bullets.push(bbbb);
        // }
        // ckc += 1
        // setTimeout(()=>{
            let rect = canvas.getBoundingClientRect();
            let xx = event.clientX - rect.left;
            let yy = event.clientY - rect.top;
            let angle = Math.atan2(yy - figure.ypos, xx - figure.xpos);
            let bbbb = new Bullet(figure.xpos+50*Math.cos(angle), figure.ypos+50*Math.sin(angle), 10, angle, {x:Math.cos(angle)*3,y:Math.sin(angle)*3});
            bullets.push(bbbb);
            isClicked = false;
        // },500)
    }) 
}


function figuremove(){
    document.addEventListener("keydown", function(event) {
        if(event.keyCode === 87) {
            // console.log("w", wPressed)
            wPressed = true;
        }
        if(event.keyCode === 68) {
            // console.log("d", dPressed)
            dPressed = true;
        }
        if(event.keyCode === 83) {
            // console.log("s", sPressed)
            sPressed = true;
        }
        if(event.keyCode === 65) {
            // console.log("a", aPressed)
            aPressed = true;
        }
    });
    document.addEventListener("keyup", function(event) {
        if(event.keyCode === 87) {
            // console.log("w", wPressed)
            wPressed = false;
        }
        if(event.keyCode === 68) {
            // console.log("d", dPressed)
            dPressed = false;
        }
        if(event.keyCode === 83) {
            // console.log("s", sPressed)
            sPressed = false;
        }
        if(event.keyCode === 65) {
            // console.log("a", aPressed)
            aPressed = false;
        }
    });
    if (aPressed){ // left key:a
        if(figure.xpos > figure.radius) {
            figure.xpos -= figure.speed;
        }
        if (figure.xpos - figure.radius <= 0) {
            figure.xpos = figure.radius;
        }
    } 
    if (wPressed){ // up key:w
        if(figure.ypos > figure.radius) {
            figure.ypos -= figure.speed;
        }
        if (figure.ypos - figure.radius <= 0) {
            figure.ypos = figure.radius;
        }
    }     
    if (dPressed){ // right key:d
        if(figure.xpos < canvas.width - figure.radius) {
            figure.xpos += figure.speed;
        }
        if (figure.xpos + figure.radius >= canvas.width) {
            figure.xpos = canvas.width - figure.radius;
        }
    }     
    if (sPressed){ // down key:s
        if(figure.ypos < canvas.height - figure.radius) {
            figure.ypos += figure.speed;
        }
        if (figure.ypos + figure.radius >= canvas.height) {
            figure.ypos = canvas.height - figure.radius;
        }
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
        // context.translate(figure.xpos, figure.ypos);
        figure.angle = angle; // 更新物件角度
    });
}
function startgame(){
    // console.log("tank x:",figure.xpos,"  tank y:",figure.ypos)
    figuremove();
    mousemove();

    context.clearRect(0, 0, canvas.width, canvas.height);
//////////////////////////////////////////////////////////////////////////////////////
    bullets.forEach(function(bullet){
        bullet.update();
    })
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
    
    figure.draw(context);

    requestAnimationFrame(startgame);
}

startgame()
projectile()
scoreObject()

// function anime(){
//     requestAnimationFrame(anime);
//     context.clearRect(0, 0, canvas.width, canvas.height);

// }


// anime();





//////////////////
// canvas.addEventListener("mousemove", function(event) {
//     context.save();
//     let rect = this.getBoundingClientRect();
//     let mouseX = event.clientX - rect.left;
//     let mouseY = event.clientY - rect.top;
//     let  angle = Math.atan2(mouseY -  figure.ypos, mouseX - figure.xpos);
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.translate(figure.xpos, figure.ypos);
//     context.rotate(angle);
//     //畫圖 
//     figure.draw(context);
//     context.restore();
//     // console.log("Mouse is at x: " + x + ", y: " + y + " inside the canvas");
// });