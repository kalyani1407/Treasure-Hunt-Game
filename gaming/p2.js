// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const congratsPopup = document.getElementById('congrats-popup');
    const closePopupButton = document.getElementById('close-popup');
    let score = 0;
    const treasureIndex = Math.floor(Math.random() * 100);

    // Create the 10x10 grid
    for (let i = 0; i < 100; i++) {
        const box = document.createElement('div');
        box.dataset.index = i;
        gameBoard.appendChild(box);
    }

    // Handle box click
    gameBoard.addEventListener('click', (e) => {
        if (e.target.dataset.index == treasureIndex) {
            e.target.style.backgroundColor = 'gold';
            score++;
            scoreElement.textContent = `Score: ${score}`;
            congratsPopup.classList.remove('hidden');
            document.getElementById('congrats-video').play();
        } else {
            e.target.style.backgroundColor = 'red';
        }
    });

    // Close the popup
    closePopupButton.addEventListener('click', () => {
        congratsPopup.classList.add('hidden');
    });
});
