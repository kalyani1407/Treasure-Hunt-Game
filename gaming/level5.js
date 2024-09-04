document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const popup = document.getElementById('popup');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const scoreElement = document.getElementById('score');
    const clueElement = document.getElementById('clue');
    let score = 0;
    const gridSize = 9;
    let treasureIndex;

    function createGrid(size) {
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${size}, 50px)`;
        grid.style.gridTemplateRows = `repeat(${size}, 50px)`;

        for (let i = 0; i < size * size; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.index = i;
            gridItem.addEventListener('click', checkForTreasure);
            grid.appendChild(gridItem);
        }
    }

    function startLevel() {
        createGrid(gridSize);
        placeTreasure();
    }

    function placeTreasure() {
        treasureIndex = Math.floor(Math.random() * gridSize * gridSize);
    }

    function checkForTreasure(event) {
        const clickedIndex = event.target.dataset.index;
        const distance = calculateDistance(clickedIndex, treasureIndex, gridSize);

        if (clickedIndex == treasureIndex) {
            popup.classList.remove('hidden');
        } else {
            event.target.style.backgroundColor = '#f08080';
            event.target.removeEventListener('click', checkForTreasure);
            score++;
            scoreElement.textContent = `Score: ${score}`;
            giveClue(distance);
        }
    }

    function calculateDistance(index1, index2, size) {
        const x1 = index1 % size;
        const y1 = Math.floor(index1 / size);
        const x2 = index2 % size;
        const y2 = Math.floor(index2 / size);

        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    function giveClue(distance) {
        let clue;
        if (distance <= 1) {
            clue = "SpongeBob!";
        } else if (distance <= 2) {
            clue = "Mickey Mouse!";
        } else if (distance <= 3) {
            clue = "Bugs Bunny!";
        } else if (distance <= 4) {
            clue = "Tom & Jerry!";
        } else if (distance <= 5) {
            clue = "Doraemon!";
        } else {
            clue = "Shinchan!";
        }
        clueElement.textContent = `Clue: ${clue}`;
    }

    
    nextLevelBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
        window.location.href = 'level6.html';
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        startLevel();
    });

    startLevel();
});
