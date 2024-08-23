const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
let score = 0;
let isJumping = false;

function jump() {
    if (!isJumping) {
        isJumping = true;
        let upInterval = setInterval(() => {
            if (dino.offsetTop <= 50) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (dino.offsetTop >= 150) {
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        dino.style.top = dino.offsetTop + 5 + "px";
                    }
                }, 20);
            } else {
                dino.style.top = dino.offsetTop - 5 + "px";
            }
        }, 20);
    }
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
    ) {
        alert("Game Over! Your Score: " + score);
        resetGame();
    }
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

function resetGame() {
    score = 0;
    updateScore();
    cactus.style.animation = "none";
    setTimeout(() => {
        cactus.style.animation = "moveCactus 2s infinite linear";
    }, 20);
}

document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "ArrowUp") {
        jump();
    }
});

setInterval(() => {
    checkCollision();
    updateScore();
}, 100);
