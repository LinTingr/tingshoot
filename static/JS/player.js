class Figure {
    constructor (name, xpos, ypos, radius, color, speed, angle, hp, damage, score, exist){
        this.xpos = xpos;
        this.name = name
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.angle = angle;
        this.hp = hp;
        this.damage = damage;
        this.score = score;
        this.exist = exist;
    }
    draw(){
        context.save()
        context.translate(this.xpos, this.ypos);
        context.rotate(this.angle);
        context.beginPath();
        //砲管
        context.fillStyle = "#b7b7b7";
        context.fillRect(15, -10, 30, 20);
        context.strokeRectStyle = "#727272"
        context.strokeRect(15, -10, 30, 20);
        context.lineWidth = 1;
        //人物
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2*Math.PI, false);
        context.fillStyle =  this.color;
        context.fill();
        context.restore()
        //血條
        context.fillStyle = "#ff0000";
        context.fillRect(this.xpos-30, this.ypos+30, 50 * (this.hp / 100), 10);
        context.strokeRect(this.xpos-30, this.ypos+30, 50* (120 / 100), 10);
        //名字
        // context.fillStyle = "rgba(255, 255, 255, 0.5)";
        // context.font = "bold 18px sans-serif";
        // context.fillText(this.name, this.xpos-16, this.ypos+40);
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
    // 更新子彈
    update() {
        this.x = this.speed.x + this.x;
        this.y = this.speed.y + this.y;
        // // 子彈超出邊界後消失
        // if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        //     let index = bullets.indexOf(this);
        //     bullets.splice(index, 1);
        //     return;
        // }
        this.draw()
    }
}

let wPressed = false;
let dPressed = false;
let sPressed = false;
let aPressed = false;   

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

function gameover(){
    context.fillStyle = "rgba(0, 205, 205, 0.8)";
    context.font = "bold 48px sans-serif";
    context.fillText("- Game Over -", canvas.width/2-180, canvas.height/2);
}