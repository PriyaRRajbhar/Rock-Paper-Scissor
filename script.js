let playerScore = 0;
        let computerScore = 0;
        let currentRound = 1;
        const maxRounds = 5;

        const choices = ['rock', 'paper', 'scissors'];
        const choiceEmojis = {
            'rock': '✊',
            'paper': '✋',
            'scissors': '✌️'
        };

        function getComputerChoice() {
            return choices[Math.floor(Math.random() * choices.length)];
        }

        function determineWinner(playerChoice, computerChoice) {
            if (playerChoice === computerChoice) {
                return 'draw';
            }
            
            if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            ) {
                return 'player';
            } else {
                return 'computer';
            }
        }

        function playGame(playerChoice) {
            // Disable buttons during round
            const buttons = document.querySelectorAll('.choice-btn');
            buttons.forEach(btn => btn.disabled = true);
            
            const computerChoice = getComputerChoice();
            const winner = determineWinner(playerChoice, computerChoice);
            
            setTimeout(() => {
                if (winner === 'draw') {
                    showDrawScreen();
                } else {
                    if (winner === 'player') {
                        playerScore++;
                    } else {
                        computerScore++;
                    }
                    
                    updateScore();
                    showRoundResult(winner, playerChoice, computerChoice);
                    
                    currentRound++;
                    
                    if (currentRound > maxRounds) {
                        setTimeout(() => {
                            showFinalResult();
                        }, 2000);
                    } else {
                        updateRoundCounter();
                    }
                }
                
                // Re-enable buttons
                setTimeout(() => {
                    buttons.forEach(btn => btn.disabled = false);
                }, 1500);
            }, 500);
        }

        function showDrawScreen() {
            const drawScreen = document.getElementById('drawScreen');
            drawScreen.style.display = 'flex';
            
            setTimeout(() => {
                drawScreen.style.display = 'none';
            }, 2000);
        }

        function showRoundResult(winner, playerChoice, computerChoice) {
            const popup = document.getElementById('popup');
            const popupTitle = document.getElementById('popupTitle');
            const popupEmoji = document.getElementById('popupEmoji');
            const popupMessage = document.getElementById('popupMessage');
            
            if (winner === 'player') {
                popupTitle.textContent = 'You Win!';
                popupEmoji.textContent = '😊';
                popupMessage.textContent = `Your ${choiceEmojis[playerChoice]} beats Computer's ${choiceEmojis[computerChoice]}`;
                popup.style.background = 'rgba(76, 175, 80, 0.9)';
            } else {
                popupTitle.textContent = 'Computer Wins!';
                popupEmoji.textContent = '🤖';
                popupMessage.textContent = `Computer's ${choiceEmojis[computerChoice]} beats your ${choiceEmojis[playerChoice]}`;
                popup.style.background = 'rgba(244, 67, 54, 0.9)';
            }
            
            popup.style.display = 'flex';
        }

        function closePopup() {
            const popup = document.getElementById('popup');
            popup.style.display = 'none';
        }

        function updateScore() {
            document.getElementById('playerScore').textContent = playerScore;
            document.getElementById('computerScore').textContent = computerScore;
        }

        function updateRoundCounter() {
            document.getElementById('currentRound').textContent = currentRound;
        }

        function showFinalResult() {
            const finalResult = document.getElementById('finalResult');
            const finalTitle = document.getElementById('finalTitle');
            const finalEmoji = document.getElementById('finalEmoji');
            const finalPlayerScore = document.getElementById('finalPlayerScore');
            const finalComputerScore = document.getElementById('finalComputerScore');
            
            finalPlayerScore.textContent = playerScore;
            finalComputerScore.textContent = computerScore;
            
            if (playerScore > computerScore) {
                finalTitle.textContent = 'Player Wins!';
                finalEmoji.textContent = '❤️';
            } else if (computerScore > playerScore) {
                finalTitle.textContent = 'Computer Wins!';
                finalEmoji.textContent = '😢';
            } else {
                finalTitle.textContent = 'It\'s a Tie!';
                finalEmoji.textContent = '🤝';
            }
            
            finalResult.style.display = 'flex';
        }

        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            currentRound = 1;
            
            updateScore();
            updateRoundCounter();
            
            document.getElementById('finalResult').style.display = 'none';
            document.getElementById('popup').style.display = 'none';
            document.getElementById('drawScreen').style.display = 'none';
        }

        // Initialize the game
        updateScore();
        updateRoundCounter();