// script.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const popup = document.getElementById('popup');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const clueElement = document.getElementById('clue');
    let score = 0;
    let level = 1;

    // Level 1 setup
    const gridSize = 5;
    const treasureIndex = Math.floor(Math.random() * gridSize * gridSize);

    function createGrid(size) {
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
        grid.style.gridTemplateRows = `repeat(${size}, 60px)`;

        for (let i = 0; i < size * size; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.index = i;
            gridItem.style.backgroundImage = `url('background${i % 10}.jpg')`; // Set background images
            gridItem.addEventListener('click', checkForTreasure);
            grid.appendChild(gridItem);
        }
    }

    function checkForTreasure(event) {
        const clickedIndex = parseInt(event.target.dataset.index);
        const distance = Math.abs(treasureIndex - clickedIndex);
        
        if (clickedIndex === treasureIndex) {
            popup.classList.remove('hidden');
        } else {
            event.target.style.backgroundColor = '#f08080';
            event.target.removeEventListener('click', checkForTreasure);
            score++;
            scoreElement.textContent = `Score: ${score}`;

            // Provide clues based on distance
            let clue = '';
            if (distance <= 2) {
                clue = 'Very close!';
            } else if (distance <= 4) {
                clue = 'Close!';
            } else if (distance <= 6) {
                clue = 'A bit far!';
            } else {
                clue = 'Far away!';
            }
            clueElement.textContent = `Clue: ${clue}`;
        }
    }

    // Move to the next level
    nextLevelBtn.addEventListener('click', () => {
        window.location.href = 'level2.html'; // Redirect to the next level
    });

    // Start Level 1
    createGrid(gridSize);
    levelElement.textContent = `Level: ${level}`;
});
