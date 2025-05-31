
frappe.pages['tap-the-leak-game'].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        single_column: true
    });



    // Hide default header
    $(page.wrapper).find('.page-head').hide();

    // Logo bar with left and right logos, no text
    const logoBar = `
        <div id="logo-bar" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; background-color:rgb(14, 130, 145); border-bottom: 1px solid #ccc;">
            <img src="/files/logo-left.png" alt="Left Logo" style="height: 40px;">
            <img src="/files/logo-right.png" alt="Right Logo" style="height: 40px;">
        </div>
    `;

    // Game heading
    const gameHeading = `
        <div id="game-heading" style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; color: #00796b;">
            💧 Tap the Leak
        </div>
    `;

    // How to play instructions
    const howToPlay = `
        <div id="how-to-play" style="text-align: center; font-size: 18px; color: #004d40; margin: 20px 0;">
            <strong>How to Play:</strong> <br>
            Click on the leaks as they appear to fix them. <br> You have 15 seconds to fix as many leaks as possible.<br>
            Earn stars based on your performance:</p>
                <li>0–4 leaks: 0 stars (Fail)</li> 
                <li>5–9 leaks: 1 star</li> 
                <li>10+ leaks: 2 stars</li>
        </div>
    `;

    // Start game button
    const startButton = `
        <div id="start-button-container" style="text-align: center; margin: 20px 0;">
            <button id="start-btn" style="padding: 10px 20px; font-size: 16px; background-color: #00796b; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Start Game
            </button>
        </div>
    `;

    // Game HTML + CSS with timer, stars, message, restart button
    const gameHTML = `
        <style>
            body > *:not(#logo-bar):not(#game-heading):not(#how-to-play):not(#start-button-container) {
                margin-top: -10px; /* Adjust this value as needed */
            }

            .leak-game-container {
                text-align: center;
                padding: 20px;
            }
            .menu-button {
                position: fixed;
                bottom: 20px;
                left: 20px;
                padding: 8px 20px;
                background-color: #00796b;
                color: white;
                font-size: 16px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Noto Sans Malayalam', sans-serif;
                z-index: 1000;
                transition: background-color 0.3s ease;
            }

            .menu-button:hover {
                background-color: #004d40;
            }


            .leak-area {
                position: relative;
                width: 300px;
                height: 300px;
                background-color: #d9f3ff;
                margin: 0 auto;
                border: 2px solid #0084c2;
                border-radius: 10px;
            }

            .leak {
                width: 40px;
                height: 40px;
                background-image: url('/assets/cleankerala/files/leak.png');
                background-size: contain;
                background-repeat: no-repeat;
                position: absolute;
                cursor: pointer;
            }

            #score-board, #timer, #stars, #result-message {
                font-size: 18px;
                margin-top: 10px;
            }

            #stars {
                font-size: 24px;
                color: gold;
                margin-top: 5px;
            }

            #restart-btn {
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 16px;
                background-color: #00796b;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                display: none;
            }
        </style>

        <div class="leak-game-container">
            <div id="timer">Time Left: 15s</div>
            <div id="score-board">Leaks Fixed: 0</div>
            <div id="stars"></div>
            <div class="leak-area" id="leak-area"></div>
            <div id="result-message"></div>
            <button id="restart-btn">Restart</button>
        </div>
    `;

    // Add to page
    $(wrapper).html(logoBar + gameHeading + howToPlay + startButton + gameHTML);

    // ✅ Immediately hide the navbar on page load
    $('.navbar').hide();

    //menu button
    $(wrapper).append('<button class="menu-button">Menu</button>');

    // Menu button click
    $(wrapper).on('click', '.menu-button', function() {
        window.location.href = '/games_menu';
    });



    // Game logic
    let score = 0;
    let timeLeft = 15; // Set the timer to 15 seconds
    let gameInterval;
    let leakInterval;

    const area = document.getElementById('leak-area');
    const scoreBoard = document.getElementById('score-board');
    const timerEl = document.getElementById('timer');
    const starsEl = document.getElementById('stars');
    const resultMessage = document.getElementById('result-message');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('start-btn');
    const howToPlayEl = document.getElementById('how-to-play');
    const startButtonContainer = document.getElementById('start-button-container');

    function spawnLeak() {
        const leak = document.createElement('div');
        leak.classList.add('leak');

        // Random position inside area (consider leak size 40x40)
        leak.style.top = Math.random() * (300 - 40) + 'px';
        leak.style.left = Math.random() * (300 - 40) + 'px';

        // Remove after 2 seconds if not clicked
        const timeout = setTimeout(() => {
            leak.remove();
        }, 2000);

        leak.onclick = () => {
            score++;
            scoreBoard.innerText = "Leaks Fixed: " + score;
            clearTimeout(timeout);
            leak.remove();
        };

        area.appendChild(leak);
    }

    function updateTimer() {
        if (timeLeft <= 0) {
            endGame();
            return;
        }
        timerEl.innerText = "Time Left: " + timeLeft + "s";
        timeLeft--;
    }

    function showStars() {
        if (score >= 15) {
            starsEl.innerHTML = '⭐⭐⭐';
        } else if (score >= 10) {
            starsEl.innerHTML = '⭐⭐';
        } else if (score >=8) {
            starsEl.innerHTML = '⭐';
        } else {
            starsEl.innerHTML = '';
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(leakInterval);
        area.innerHTML = ''; // remove leaks
        restartBtn.style.display = 'inline-block';

        showStars();

        if (score >= 10) {
            resultMessage.style.color = 'green';
            resultMessage.innerText = `You Win! You fixed ${score} leaks.`;

            // Redirect to congratulation page after 3 seconds
            setTimeout(() => {
                frappe.set_route('congratulation');
            }, 3000);
        } else {
            resultMessage.style.color = 'red';
            resultMessage.innerText = `You Failed! You fixed ${score} leaks. Try again to fix more leaks.`;
        }
    }


    function startGame() {
        score = 0;
        timeLeft = 15; // Reset timer to 15 seconds
        scoreBoard.innerText = "Leaks Fixed: 0";
        timerEl.innerText = "Time Left: 15s";
        starsEl.innerHTML = '';
        resultMessage.innerText = '';
        restartBtn.style.display = 'none';
        area.innerHTML = '';
        howToPlayEl.style.display = 'none';
        startButtonContainer.style.display = 'none';

        // Spawn leaks every second
        leakInterval = setInterval(spawnLeak, 1000);

        // Timer every second
        gameInterval = setInterval(updateTimer, 1000);
    }

    // Start the game when the "Start Game" button is clicked
    startBtn.onclick = () => {
        startGame();
    };

    // Restart button click
    restartBtn.onclick = () => {
        startGame();
    };

    // Initially show the "How to Play" instructions and "Start Game" button
    howToPlayEl.style.display = 'block';
    startButtonContainer.style.display = 'block';
};










