frappe.pages['trash-runner-game'].on_page_load = function (wrapper) {
    console.log("Trash Sorter Game page loaded", wrapper);

    try {
        // Create page layout
        const page = frappe.ui.make_app_page({
            parent: wrapper,
            single_column: true
        });
        console.log("Page created:", page);

        // Hide default page title bar
        $(page.wrapper).find('.page-head').hide();

        // ✅ Inject logo bar outside of page.body
        const logoBar = `
            <div class="trash-runner-header">
                <img src="/files/logo-left.png" alt="Left Logo">
                <img src="/files/logo-right.png" alt="Right Logo">
            </div>
            <style>
                .trash-runner-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 30px;
                    background-color: #00796b;
                    width: 100%;
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

                .trash-runner-header img {
                    height: 60px;
                }
            </style>
        `;
        $(page.parent).prepend(logoBar);  // ✅ Add logo bar above page body

        // ✅ Game HTML UI inside page
        const gameHTML = `
            <div style="text-align:center; margin-bottom:10px; font-size:22px; font-weight:bold; color:#00796b;">
                🗑️ ട്രാഷ് സോർട്ടർ - ശരിയായ ബിൻ തിരഞ്ഞെടുക്കുക! ♻️
            </div>
            <div id="item-container" style="font-size:60px; text-align:center; margin:30px 0;">🍌</div>
            <div style="text-align:center;">
                <button id="btn-recycle" style="font-size:20px; margin:5px; padding:10px 20px;">♻️ റീസൈക്കിൾ</button>
                <button id="btn-organic" style="font-size:20px; margin:5px; padding:10px 20px;">🍂 ഓർഗാനിക്</button>
                <button id="btn-trash" style="font-size:20px; margin:5px; padding:10px 20px;">🗑️ മാലിന്യം</button>
            </div>
            <div id="score" style="text-align:center; font-size:18px; color:#004d40; margin-top:20px;">സ്കോർ: 0 | ജീവൻ: 3</div>
            <div id="game-over" style="text-align:center; font-size:24px; color:red; margin-top:20px; display:none;"></div>
            <div id="restart-wrapper" style="text-align:center; margin-top:20px; display:none;">
                <button id="restart-btn" style="font-size:20px; padding:10px 30px;">പുനരാരംഭിക്കുക</button>
            </div>
        `;

        $(page.body).html(gameHTML);  // ✅ Inject game into the page body

        // ✅ Immediately hide the navbar on page load
         $('.navbar').hide();


        $(wrapper).append('<button class="menu-button">Menu</button>');

        // Menu button click
        $(wrapper).on('click', '.menu-button', function() {
            window.location.href = '/games_menu';
        });

        // Game data
        const items = [
            // 🌿 Organic Waste
            { emoji: "🍌", bin: "organic" },   // Banana peel
            { emoji: "🍎", bin: "organic" },   // Apple core
            { emoji: "🍇", bin: "organic" },   // Grapes
            { emoji: "🍂", bin: "organic" },   // Dry leaves
            { emoji: "🥬", bin: "organic" },   // Lettuce
            { emoji: "🥕", bin: "organic" },   // Carrot
            { emoji: "🍉", bin: "organic" },   // Watermelon slice

            // 🔄 Recyclable Waste
            { emoji: "📦", bin: "recycle" },   // Cardboard box
            { emoji: "🥤", bin: "recycle" },   // Plastic cup
            { emoji: "📄", bin: "recycle" },   // Paper
            { emoji: "🧴", bin: "recycle" },   // Plastic bottle
            { emoji: "🪞", bin: "recycle" },   // Mirror/glass
            

            // 🗑️ Trash / Hazardous Waste
            { emoji: "💣", bin: "trash" },     // Bomb (symbolic hazardous)
            { emoji: "🔋", bin: "trash" },     // Battery
            { emoji: "🧨", bin: "trash" },     // Firework
            { emoji: "💊", bin: "trash" },     // Medicine
            { emoji: "🚬", bin: "trash" },     // Cigarette
            { emoji: "🧼", bin: "trash" }      // Soap (used or partial)
        ];



        let currentItem = null;
        let score = 0;
        let lives = 3;
        let gameOver = false;

        // Cache jQuery selectors
        const itemContainer = $('#item-container');
        const scoreDisplay = $('#score');
        const gameOverDisplay = $('#game-over');
        const restartWrapper = $('#restart-wrapper');

        // Pick random new item
        function pickNewItem() {
            currentItem = items[Math.floor(Math.random() * items.length)];
            itemContainer.text(currentItem.emoji);
        }

        // Update score display
        function updateScore() {
            scoreDisplay.text(`സ്കോർ: ${score} | ജീവൻ: ${lives}`);
        }

        // End the game and show message + restart button
        function endGame(message, isWin = false) {
            gameOver = true;
            gameOverDisplay.show().text(message);
            restartWrapper.show();

            if (isWin) {
                setTimeout(() => {
                    frappe.set_route('congratulation');
                }, 3000);  // Redirect after 3 seconds
            }
        }

        // Check user answer from button clicks
        function checkAnswer(selectedBin) {
            if (gameOver) return;

            if (selectedBin === currentItem.bin) {
                score += 1;
            } else {
                lives -= 1;
            }

            updateScore();

            if (lives <= 0) {
                endGame(`❌ കളി അവസാനിച്ചു! നിങ്ങളുടെ സ്കോർ: ${score}`);
            } else if (score >= 10) {
                endGame(`🎉 വിജയിച്ചു! നിങ്ങൾക്ക് ലഭിച്ചത്: ${score} സ്കോർ!`, true);
            } else {
                pickNewItem();
            }
        }

        // Button event handlers
        $('#btn-recycle').click(() => checkAnswer('recycle'));
        $('#btn-organic').click(() => checkAnswer('organic'));
        $('#btn-trash').click(() => checkAnswer('trash'));

        // Restart button handler
        $('#restart-btn').click(() => {
            score = 0;
            lives = 3;
            gameOver = false;
            gameOverDisplay.hide();
            restartWrapper.hide();
            updateScore();
            pickNewItem();
        });

        // Start game
        pickNewItem();
        updateScore();

    } catch (error) {
        console.error("Error in trash-runner-game page load:", error);
    }
};
