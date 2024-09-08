const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const gameArea = document.getElementById('gameArea');
const obstacles = document.querySelectorAll('.obstacle');

let ballX = gameArea.clientWidth / 2;
let ballY = gameArea.clientHeight / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0 || ballX >= gameArea.clientWidth - ball.clientWidth) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY <= 0 || ballY >= gameArea.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    if (detectCollision(leftPaddle) || detectCollision(rightPaddle) || detectObstacleCollision()) {
        ballSpeedY = -ballSpeedY;
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    movePaddles();

    requestAnimationFrame(moveBall);
}

function detectObstacleCollision() {
    for (let obstacle of obstacles) {
        if (detectCollision(obstacle)) {
            return true;
        }
    }
    return false;
}

function detectCollision(element) {
    const elementRect = element.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    return !(ballRect.right < elementRect.left || 
             ballRect.left > elementRect.right || 
             ballRect.bottom < elementRect.top || 
             ballRect.top > elementRect.bottom);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        leftPaddleSpeed = -5;
    } else if (event.key === 'ArrowRight') {
        rightPaddleSpeed = 5;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        leftPaddleSpeed = 0;
        rightPaddleSpeed = 0;
    }
});

function movePaddles() {
    const leftPaddleCurrentLeft = parseInt(window.getComputedStyle(leftPaddle).left);
    const rightPaddleCurrentLeft = parseInt(window.getComputedStyle(rightPaddle).left);

    leftPaddle.style.left = leftPaddleCurrentLeft + leftPaddleSpeed + 'px';
    rightPaddle.style.left = rightPaddleCurrentLeft + rightPaddleSpeed + 'px';
}

// Iniciar el movimiento de la bola
moveBall();




