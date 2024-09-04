// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const clueElement = document.getElementById('clue');
    const congratsPopup = document.getElementById('congrats-popup');
    const closePopupButton = document.getElementById('close-popup');
    let score = 0;
    const treasureIndex = Math.floor(Math.random() * 100);
    let timeLeft = 60; // Time in seconds
    let timerInterval;

    // Create the 10x10 grid
    for (let i = 0; i < 100; i++) {
        const box = document.createElement('div');
        box.dataset.index = i;
        gameBoard.appendChild(box);
    }

    // Start the timer
    const startTimer = () => {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time is up! Game over.');
            }
        }, 1000);
    };

    // Get the clue based on the current index
    const getClue = (currentIndex) => {
        const currentRow = Math.floor(currentIndex / 10);
        const currentCol = currentIndex % 10;
        const treasureRow = Math.floor(treasureIndex / 10);
        const treasureCol = treasureIndex % 10;

        if (currentRow < treasureRow) {
            return 'Move Down';
        } else if (currentRow > treasureRow) {
            return 'Move Up';
        } else if (currentCol < treasureCol) {
            return 'Move Right';
        } else if (currentCol > treasureCol) {
            return 'Move Left';
        } else {
            return '';
        }
    };

    // Handle box click
    gameBoard.addEventListener('click', (e) => {
        const currentIndex = parseInt(e.target.dataset.index, 10);
        if (currentIndex === treasureIndex) {
            e.target.style.backgroundColor = 'gold';
            score++;
            scoreElement.textContent = `Score: ${score}`;
            clueElement.textContent = 'Clue: You found the treasure!';
            clearInterval(timerInterval);
            congratsPopup.classList.remove('hidden');
            document.getElementById('congrats-video').play();
        } else {
            e.target.style.backgroundColor = 'red';
            clueElement.textContent = `Clue: ${getClue(currentIndex)}`;
        }
    });

    // Close the popup
    closePopupButton.addEventListener('click', () => {
        congratsPopup.classList.add('hidden');
    });

    // Start the game
    startTimer();
});
