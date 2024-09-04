document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const popup = document.getElementById('popup');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    let score = 0;
    let level = 1;

    // Define levels
    const levels = [
        { gridSize: 5 },
        { gridSize: 6 },
        { gridSize: 7 },
        { gridSize: 8 },
        { gridSize: 9 },
        { gridSize: 10 }
    ];

    function createGrid(size) {
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${size}, 50px)`;
        grid.style.gridTemplateRows = `repeat(${size}, 50px)`;

        for (let i = 0; i < size * size; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.index = i;
            gridItem.style.backgroundImage = `url('background${i % 10}.jpg')`; // Set background images
            gridItem.addEventListener('click', checkForTreasure);
            grid.appendChild(gridItem);
        }
    }

    function startLevel(level) {
        const gridSize = levels[level - 1].gridSize;
        createGrid(gridSize);
        placeTreasure(gridSize);
        levelElement.textContent = `Level: ${level}`;
    }

    let treasureIndex;

    function placeTreasure(size) {
        treasureIndex = Math.floor(Math.random() * size * size);
    }

    function checkForTreasure(event) {
        const clickedIndex = event.target.dataset.index;
        if (clickedIndex == treasureIndex) {
            popup.classList.remove('hidden');
        } else {
            event.target.style.backgroundColor = '#f08080';
            event.target.removeEventListener('click', checkForTreasure);
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
    }

    // Move to the next level
    nextLevelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
        level++;
        if (level <= levels.length) {
            startLevel(level);
        } else {
            alert('Congratulations! You completed all levels!');
        }
    });

    // Start the first level
    startLevel(level);
});
