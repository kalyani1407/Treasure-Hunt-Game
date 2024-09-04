let startTime;
let interval;
let score = 100;
const treasureIndex = Math.floor(Math.random() * 100);
let gameStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    updateScoreAndTime();
});

function startGame(event) {
    event.preventDefault();
    
    const playerName = document.getElementById('player-name').value;
    const difficulty = document.getElementById('difficulty').value;

    console.log(`Player: ${playerName}, Difficulty: ${difficulty}`);
    
    startTime = Date.now();
    interval = setInterval(updateTime, 1000);
    gameStarted = true;
    
    document.getElementById('settings-form').style.display = 'none';
}

function checkBox(box, index) {
    if (!gameStarted) {
        alert('Please start the game by submitting your name and selecting a difficulty.');
        return;
    }

    if (box.classList.contains('clicked')) return;

    box.classList.add('clicked');
    box.innerHTML = `<img src="clue${index % 5}.png" alt="Clue">`; // Display different clue images

    score -= 1;
    document.getElementById('score').textContent = score;

    if (index === treasureIndex) {
        clearInterval(interval);
        showPopup();
    }
}

function showPopup() {
    const time = ((Date.now() - startTime) / 1000).toFixed(2);
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup').querySelector('.message').textContent = `Congratulations, you found the treasure! Your score is ${score} and your time is ${time}s.`;
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function updateTime() {
    const time = ((Date.now() - startTime) / 1000).toFixed(2);
    document.getElementById('time').textContent = `${time}s`;
}

function updateScoreAndTime() {
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = '0s';
}
