let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "magenta"; 
    ctx.fill(); 
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();

    x+=dx;
    y+=dy;

    let ballRadius = 10;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y - dy < ballRadius) {
        dy = -dy;
    }
}
setInterval(draw,10);

