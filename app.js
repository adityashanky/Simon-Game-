let gameSeq = [];
let userSeq = [];
const btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

const h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
    if (!started) {
        console.log("Game is started");
        reset();
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    if (!btn) return;
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);

    if (!randBtn) {
        console.error(`Button for color ${randColor} not found.`);
        return;
    }

    gameSeq.push(randColor);
    console.log("Game sequence:", gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("Correct sequence so far.");
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any key to Start...`;
        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    const btn = this;
    userFlash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

const allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => btn.addEventListener("click", btnPress));

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press any key to start the Game";
    console.log("Game has been reset.");
}
