document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const popup = document.getElementById('popup');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const clueElement = document.getElementById('clue');
    let score = 0;
    const gridSize = 8; 
    const treasureIndex = Math.floor(Math.random() * gridSize * gridSize);

    function createGrid(size) {
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
        grid.style.gridTemplateRows = `repeat(${size}, 60px)`;

        for (let i = 0; i < size * size; i++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.index = i;
            gridItem.style.backgroundImage = `url('background${i % 10}.jpg')`; 
            gridItem.addEventListener('click', checkForTreasure);
            grid.appendChild(gridItem);
        }
    }

    function checkForTreasure(event) {
        const clickedIndex = parseInt(event.target.dataset.index);
        const distance = Math.abs(treasureIndex - clickedIndex);

        if (clickedIndex === treasureIndex) {
            showPopup();
        } else {
            event.target.style.backgroundColor = '#f08080'; 
            event.target.removeEventListener('click', checkForTreasure);
            score++;
            scoreElement.textContent = `Score: ${score}`;

            
            let clue = '';
            if (distance <= 1) {
                clue = 'Lotus!';
            } else if (distance <= 2) {
                clue = 'Jasmine!';
            } else if (distance <= 3) {
                clue = 'Marigold!';
            } else if (distance <= 4) {
                clue = 'Hibiscus!';
            } else {
                clue = 'Rose!';
            }
            clueElement.textContent = `Clue: ${clue}`;
        }
    }

    function showPopup() {
        popup.classList.remove('hidden');
    }

    nextLevelBtn.addEventListener('click', () => {
        window.location.href = 'level5.html'; 
    });

    
    createGrid(gridSize);
    levelElement.textContent = `Level: 4`;
});
