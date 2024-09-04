// Timer variables
let startTime;
let timerInterval;

// Place the treasure randomly in one of the boxes
const treasureIndex = Math.floor(Math.random() * 100);

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('time').innerText = `${elapsedTime}s`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function checkBox(box) {
    const index = Array.from(box.parentElement.children).indexOf(box);

    if (index === treasureIndex) {
        box.style.backgroundColor = 'gold';
        showPopup();
        stopTimer();
    } else {
        box.style.backgroundColor = 'red';
    }
}

function showPopup() {
    document.getElementById('popup').style.display = 'block';
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('marks').innerText = 100; // You can adjust the marks logic
    document.getElementById('time').innerText = `${elapsedTime}s`;
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', (event) => {
    startTimer();
});


