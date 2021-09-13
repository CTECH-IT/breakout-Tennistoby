let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,10,0,ballRadius, Math.PI*2, false);
    ctx.fillStyle = "0095DD"; 
    ctx.fill(); 
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    drawBall();

    x+=dx;
    y+=dy;
    if (x>canvas.width || x<0) {
        dx = -dx;
    }
    if(y>canvas.height || y<0) {
        dy = -dy;
    }
}
setInterval(draw,10);

