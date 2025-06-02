frappe.pages['trash-matching-game'].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        single_column: true,
    });

    // Hide Frappe default page head
    $(page.wrapper).find('.page-head').hide();

    // Styles
    const style = `
    <style>
        .puzzle-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 30px;
            background-color: #00796b;
            width: 100vw;
            box-sizing: border-box;
            margin-left: calc(-1 * (100vw - 100%)/2);
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
        .puzzle-header img {
            width: 80px;
            height: auto;
        }
        .puzzle-title {
            text-align: center;
            color: #004d40;
            font-size: 30px;
            font-weight: bold;
            font-family: 'Noto Sans Malayalam', sans-serif;
            margin: 20px 0 40px 0;
        }
    </style>
    `;
    $(wrapper).append(style);

    // Immediately hide the navbar on page load
    $('.navbar').hide();

    $(wrapper).append('<button class="menu-button">Menu</button>');
    $(wrapper).on('click', '.menu-button', function() {
        window.location.href = '/games_menu';
    });

    // Header with logos
    const header = `
        <div class="puzzle-header">
            <img src="/files/logo-left.png" alt="Left Logo">
            <img src="/files/logo-right.png" alt="Right Logo">
        </div>
        <div class="puzzle-title">♻️ മാച്ചിംഗ് ഗെയിം 🗑️</div>
    `;
    $(wrapper).prepend(header);

    // Game HTML
    $(page.main).html(`
        <div class="result-message" style="text-align:center; margin-bottom:10px;"></div>
        <div id="game-board" style="
            display: grid;
            grid-template-columns: repeat(4, 60px);
            grid-gap: 16px;
            justify-content: center;
        "></div>
        <div id="stats" style="text-align:center; margin-top:20px; font-size:18px; color:#004d40;">
            Moves: 0 | Matches: 0
        </div>
        <div style="text-align:center; margin-top:20px;">
            <button id="restart-btn" style="font-size:18px; padding:10px 20px;">പുനരാരംഭിക്കുക</button>
        </div>
    `);

    const items = ['🍌', '🍎', '🍂', '📦', '🗑️', '📰', '💣', '🧹', '🔋', '🧨', '🥫', '🥕'];
    let cards = [];
    items.forEach(item => {
        cards.push({ id: item, content: item });
        cards.push({ id: item, content: item });
    });
    // ❌ No dummy card

    cards = shuffle(cards);

    const gameBoard = $('#game-board');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matches = 0;

    updateStats();

    function createCard(card) {
        const cardDiv = $(`
            <div class="card" data-id="${card.id}" 
                style="
					width: 48px; height: 48px; background: #004d40; 
					color: white; font-size: 20px; 
					display: flex; justify-content: center; align-items: center; 
					cursor: pointer; border-radius: 6px; user-select: none;
					box-shadow: 0 2px 5px rgba(0,0,0,0.3);
					padding: 6px;
					box-sizing: border-box;
				">
            </div>
        `);

        cardDiv.on('click', function() {
            if (lockBoard || $(this).hasClass('flipped')) return;

            flipCard($(this), card);

            if (!firstCard) {
                firstCard = { el: $(this), card };
                return;
            }

            secondCard = { el: $(this), card };
            lockBoard = true;
            moves++;
            updateStats();

            if (firstCard.card.id === secondCard.card.id) {
                firstCard.el.css('background', '#00796b').addClass('matched');
                secondCard.el.css('background', '#00796b').addClass('matched');
                matches++;
                resetTurn();

                if (matches === items.length) {
                    setTimeout(() => {
                        $('.result-message').html('<div style="color: green; font-size: 20px;">അഭിനന്ദനങ്ങൾ! നിങ്ങൾ വിജയിച്ചു 🎉</div>');
                        setTimeout(() => {
                            frappe.set_route('congratulation');
                        }, 3000);
                    }, 300);
                }

            } else {
                setTimeout(() => {
                    firstCard.el.removeClass('flipped').text('').css('background', '#004d40');
                    secondCard.el.removeClass('flipped').text('').css('background', '#004d40');
                    resetTurn();
                }, 1000);
            }
        });

        return cardDiv;
    }

    function renderBoard() {
        gameBoard.empty();
        cards.forEach(card => {
            gameBoard.append(createCard(card));
        });
    }

    $('#restart-btn').click(() => {
        moves = 0;
        matches = 0;
        updateStats();
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        cards = shuffle(cards);
        renderBoard();
        $('.result-message').empty();
    });

    function flipCard(cardEl, card) {
        cardEl.addClass('flipped');
        cardEl.text(card.content);
    }

    function resetTurn() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function updateStats() {
        $('#stats').text(`Moves: ${moves} | Matches: ${matches}`);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    renderBoard();
};
