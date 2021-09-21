let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 1.5;
let dy = -1.5;
let ballRadius = 10;
let rightPressed = false; 
let leftPressed = false; 

let paddleHeight = 10; 
let paddleWidth = 90; 

let paddleX = (canvas.width - paddleWidth) / 2;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let brickCounter = 0;
let score = 0;
let lives = 3;
let levelCount = 1;
let bricks = [];

for (let c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x:0, y: 0, show: true};
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
    if (levelCount % 3 ==1) {
        ctx.fillStyle = "blue"; 
    }
    if (levelCount % 3 ==1) {
        ctx.fillStyle = "red";
    }
    if (levelCount % 3 ==0) {
        ctx.fillStyle = "green";
    }
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if (bricks[c][r].show ==true) {
                let brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft; 
                let brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop; 
                bricks[c][r].x = brickX; 
                bricks[c][r].y = brickY; 
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight); 
                ctx.fillStyle = "hsl("+Date.now()*0.07%360+",80%,50%)";
                ctx.fill(); 
                ctx.closePath(); 
            }
        }
    }
}

function resetBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r].show = true;
        }
    }
}


function collisionDetection() {
    for (let c=0; c< brickColumnCount; c++) {
        for(let r=0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.show ==true) {
                if (x> b.x && x < b.x + brickWidth && y > b.y && y <b.y + brickHeight) {
                    dy = -dy;
                    b.show = false;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        if (levelCount % 3 ==1) {
                            alert("Onto Level 2!");
                            resetBricks();
                            x = canvas.width/2;
                            y = canvas.height-30;
                            paddleWidth -=30;
                            levelCount +=1;
                            dx = 2;
                            dy = -2;
                            
                        }
                        if (levelCount % 3==2 ) {
                            alert("Onto Level 3!");
                            resetBricks();
                            x = canvas.width/2;
                            y = canvas.height-30;
                            paddleWidth -=30;
                            levelCount +=1;
                            dx = 2.5;
                            dy = -2.5;
                        }
                        if (levelCount % 3==0) {
                            alert("Back to Level 1!");
                            resetBricks();
                            x = canvas.width/2;
                            y = canvas.height-30;
                            paddleWidth = 90;
                            levelCount +=1;
                            dx = 1.5;
                            dy = -1.5;
                        }
                        
                        
                    }
                }
            }
            
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green"; 
    ctx.fillText("Score: " + score, 8, 20);

}
function drawLives() {
    ctx.font = "16px Arial"; 
    ctx.fillStyle = "blue"; 
    ctx.fillText("Lives: " + lives, canvas.width-80, 20 );
}

function drawLevel() {
    ctx.font = "16px Arial"; 
    ctx.fillStyle = "blue"; 
    ctx.fillText("Level:" + (levelCount%3), canvas.width-80, canvas.height - 20);
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

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft; 
    if (relativeX > 0 && relativeX > canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
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
            dy = -dy; }
        else if (lives == 1){
            alert("Game Over!");
            document.location.reload();
            clearInterval(interval); }
        else {
            lives -=1;
            x = canvas.width/2;
            y = canvas.height-30;
            if (levelCount % 3 ==1) {
                dx = 1.5;
                dy = -1.5;
            }
            else if (levelCount % 3 ==2) {
                dx = 2;
                dy = -2;
            }
            else if (levelCount % 3 ==0) {
                dx = 2.5;
                dy = -2.5;
            }
            paddleX = (canvas.width-paddleWidth)/2;

        }
    }
    console.log("lives: ", lives, " dx: ", dx, " dy: ", dy);

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
    drawLevel();

    collisionDetection();
    drawScore();
    drawLives();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

let interval = setInterval(draw,10);