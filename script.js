const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ball_img = document.getElementById("ball");
const bar_img = document.getElementById("bar");

let raf;

let ball = {
    x: 300,
    y: 50,
    width: 40,
    height: 40,
    changeX: 3,
    changeY: 3,
    draw(){
        this.x += this.changeX;
        this.y += this.changeY;
        if(this.x + this.width >= canvas.width || this.x <= 0){
           this.changeX *= -1;
        }
        if(this.y + this.height >= canvas.height || this.y <= 0){
            this.changeY *= -1;
        }
        ctx.drawImage(ball_img, this.x, this.y, this.width, this.height);
    }
} 

let bar = {
    x: 300,
    y: 250,
    width: 100,
    height: 20,
    changeX: 0,
    draw(){
        this.x += this.changeX;
        if(this.x + this.width >= canvas.width){
            this.x = canvas.width - this.width;
        }
        if(this.x <= 0){
            this.x = 0;
        }
        ctx.drawImage(bar_img, this.x, this.y, this.width, this.height);
    }
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    bar.draw();  
    if(ball.y + ball.height >= bar.y && ball.x + ball.width > bar.x && bar.x + bar.width > ball.x && bar.y + bar.height > ball.y){
        ball.changeY *= -1;
    }
    raf = window.requestAnimationFrame(update);  
}

update();

window.addEventListener("keydown", moveBar);

function moveBar(e){
    if(e.keyCode == 39){
        bar.changeX = 4;
    }
    else if(e.keyCode == 37){
        bar.changeX = -4;
    }
}

window.addEventListener("keyup", stopBar);

function stopBar(e){
    if(e.keyCode == 39 || e.keyCode == 37){
        bar.changeX = 0;
    }
}