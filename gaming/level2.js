// level2.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const popup = document.getElementById('popup');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const clueElement = document.getElementById('clue');
    let score = 0;
    let level = 2;
    const gridSize = 6;
    let treasureIndex;

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

    function placeTreasure(size) {
        treasureIndex = Math.floor(Math.random() * size * size);
    }

    function getClue(distance) {
        if (distance <= 1) return 'Very hot!';
        if (distance <= 2) return 'Hot!';
        if (distance <= 3) return 'Warm!';
        return 'Cold!';
    }

    function checkForTreasure(event) {
        const clickedIndex = parseInt(event.target.dataset.index);
        const rowClicked = Math.floor(clickedIndex / gridSize);
        const colClicked = clickedIndex % gridSize;
        const rowTreasure = Math.floor(treasureIndex / gridSize);
        const colTreasure = treasureIndex % gridSize;
        const distance = Math.max(Math.abs(rowClicked - rowTreasure), Math.abs(colClicked - colTreasure));

        if (clickedIndex === treasureIndex) {
            popup.classList.remove('hidden');
        } else {
            event.target.style.backgroundColor = '#f08080';
            event.target.removeEventListener('click', checkForTreasure);
            score++;
            scoreElement.textContent = `Score: ${score}`;
            clueElement.textContent = `Clue: ${getClue(distance)}`;
        }
    }

    nextLevelBtn.addEventListener('click', () => {
        window.location.href = 'level3.html';
    });

    createGrid(gridSize);
    placeTreasure(gridSize);
    levelElement.textContent = `Level: ${level}`;
});
