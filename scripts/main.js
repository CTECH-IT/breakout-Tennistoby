let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 1;
let dy = -1;
let ballRadius = 10;
let rightPressed = false; 
let leftPressed = false; 

let paddleHeight = 10; 
let paddleWidth = 70;
let paddleX = (canvas.width - paddleWidth) / 2;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];
for (let c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x:0, y: 0};
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "magenta"; 
    ctx.fill(); 
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue"; 
    ctx.fill();
    ctx.closePath();

}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft; 
            let brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop; 
            bricks[c][r].x = brickX; 
            bricks[c][r].y = brickY; 
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight); 
            ctx.fillStyle = "magenta"; 
            ctx.fill(); 
            ctx.closePath(); 
        }

    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key =="Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key =="Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function draw() {
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawBall();
    

    x+=dx;
    y+=dy;


    console.log(paddleX);

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
   
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        alert("Game Over!");
        document.location.reload();
        clearInterval(interval);
    }
   
    if(rightPressed) {
        paddleX +=3; 
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth; 
        }
    }
    else if(leftPressed) {
        paddleX -=3;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    drawPaddle();
   
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw,10);

