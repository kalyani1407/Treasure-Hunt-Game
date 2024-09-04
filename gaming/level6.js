document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const clue = document.getElementById('clue');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    let score = 0;
    let treasurePosition = Math.floor(Math.random() * 100); 

    
    let timeLeft = 30; 
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = `Time's up!`;
                clue.innerHTML = '<p>Time is over. Redirecting to homepage...</p>';
                
                setTimeout(() => {
                    window.location.href = 'homepage.html'; 
                }, 2000);
                return;
            }
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timerDisplay.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timeLeft -= 1;
        }, 1000);
    }

    startTimer(); 

    for (let i = 0; i < 100; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        const img = document.createElement('img');
        gridItem.appendChild(img);
        gridItem.addEventListener('click', () => {
            if (i === treasurePosition) {
                img.style.display = 'block';
                clue.textContent = 'Congratulations! You found the treasure!';
                document.getElementById('popup').classList.remove('hidden');
                scoreDisplay.textContent = `Score: ${score}`;
            } else {
                img.style.display = 'block'; 
                score += 1;
                scoreDisplay.textContent = `Score: ${score}`;
                
                const clueText = getClue(i, treasurePosition);
                clue.textContent = clueText;
            }
        });
        grid.appendChild(gridItem);
    }

    document.getElementById('finish-game-btn').addEventListener('click', () => {
        window.location.href = 'homepage.html'; 
    });

    function getClue(currentIndex, treasureIndex) {
        const currentRow = Math.floor(currentIndex / 10);
        const currentCol = currentIndex % 10;
        const treasureRow = Math.floor(treasureIndex / 10);
        const treasureCol = treasureIndex % 10;

        if (currentRow === treasureRow && currentCol === treasureCol) {
            return 'Congratulations! You found the treasure!';
        }

        let clueDirection = '';
        if (currentRow < treasureRow) clueDirection += 'down ';
        if (currentRow > treasureRow) clueDirection += 'up ';
        if (currentCol < treasureCol) clueDirection += 'right ';
        if (currentCol > treasureCol) clueDirection += 'left ';

        if (clueDirection === '') clueDirection = 'You are on top of the treasure!';

        return `The treasure is to the ${clueDirection.trim()}.`;
    }
});
