
        const board = document.getElementById('board');
        const cells = document.querySelectorAll('[data-cell]');
        const currentPlayerText = document.getElementById('current-player');
        const winnerModal = document.getElementById('winner-modal');
        const winnerText = document.getElementById('winner-text');
        const resetBtn = document.getElementById('reset-btn');

        let currentPlayer = 'X';
        let gameActive = true;
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(cell, index));
            
            // Add 3D hover effect
            cell.addEventListener('mouseover', () => {
                if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
                    cell.style.transform = 'translateZ(20px)';
                }
            });
            
            cell.addEventListener('mouseout', () => {
                if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
                    cell.style.transform = 'translateZ(0)';
                }
            });
        });

        function handleCellClick(cell, index) {
            if (gameState[index] !== '' || !gameActive) return;

            gameState[index] = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());
            
            if (checkWin()) {
                endGame(false);
            } else if (checkDraw()) {
                endGame(true);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                currentPlayerText.textContent = currentPlayer;
            }
        }

        function checkWin() {
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return gameState[index] === currentPlayer;
                });
            });
        }

        function checkDraw() {
            return gameState.every(cell => cell !== '');
        }

        function endGame(draw) {
            gameActive = false;
            if (draw) {
                winnerText.textContent = "It's a Draw!";
            } else {
                winnerText.textContent = `Player ${currentPlayer} Wins!`;
            }
            winnerModal.classList.add('active');
        }

        function resetGame() {
            gameState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'X';
            currentPlayerText.textContent = 'X';
            cells.forEach(cell => {
                cell.className = 'cell';
                cell.style.transform = '';
            });
            winnerModal.classList.remove('active');
        }

        resetBtn.addEventListener('click', resetGame);

        // Add 3D perspective effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            board.style.transform = `rotateX(${20 + yAxis}deg) rotateY(${xAxis}deg)`;
        });

        // Reset transform on touch devices
        if ('ontouchstart' in window) {
            board.style.transform = 'rotateX(15deg)';
        }
    