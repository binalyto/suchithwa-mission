frappe.pages['games-menu'].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        single_column: true
    });

    $(page.wrapper).find('.page-head').hide();

    // Add styles
    const styles = `
    <style>
		.menu-logo-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 30px;
			background-color: #004d40;
			color: white;
		}
		.menu-logo-bar img {
			height: 60px;
		}
		.menu-logo-bar .profile-name {
			font-size: 20px;
			font-weight: bold;
		}

		.game-menu-section {
			max-width: 1000px;
			margin: 30px auto;
			padding: 20px;
			font-family: 'Noto Sans', sans-serif;
		}
		.menu-title {
			text-align: center;
			font-size: 24px;
			color: #00796b;
			margin-bottom: 30px;
		}

		.game-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: 20px;
		}

		.game-card {
			background-color: #e0f2f1;
			padding: 15px;
			border-radius: 10px;
			text-align: center;
			box-shadow: 0 2px 6px rgba(0,0,0,0.08);
			cursor: pointer;
			transition: transform 0.2s, background 0.3s;
		}

		.game-card:hover {
			transform: translateY(-3px);
			background-color: #b2dfdb;
		}

		.game-icon {
			font-size: 28px;
			margin-bottom: 8px;
		}

		.game-title {
			font-size: 16px;
			font-weight: 600;
			color: #004d40;
		}

		.game-desc {
			font-size: 12px;
			color: #555;
			margin-top: 4px;
		}
	</style>
    `;
    $(page.body).append(styles);

	// ✅ Immediately hide the navbar on page load
    $('.navbar').hide();

    // Logo bar
    const logoBar = `
        <div class="menu-logo-bar">
            <img src="/files/logo-left.png" alt="Left Logo">
            <div class="profile-name"></div>
            <img src="/files/logo-right.png" alt="Right Logo">
        </div>
    `;
    $(page.wrapper).prepend(logoBar);

    // Game menu HTML
    const menuHTML = `
        <div class="game-menu-section">
            <div class="menu-title">സ്വച്ഛ കേരള - ഗെയിംസ് <br> നിങ്ങളുടെ ഗെയിം തിരഞ്ഞെടുക്കൂ 🎮</div>
            <div class="game-grid">
                <div class="game-card" data-route="trash-runner-game">
                    <div class="game-icon">🚀</div>
                    <div class="game-title">ട്രാഷ് സോർട്ടർ</div>
                    <div class="game-desc">ശരിയായ ബിൻ തിരഞ്ഞെടുക്കുക! ♻️</div>
                </div>
                <div class="game-card" data-route="puzzle-game">
                    <div class="game-icon">🧩</div>
                    <div class="game-title">ചോദ്യോത്തരങ്ങൾ</div>
                    <div class="game-desc">പരിസ്ഥിതി വിഷയങ്ങൾക്കായുള്ള ചോദ്യങ്ങൾ !</div>
                </div>
                <div class="game-card" data-route="tap-the-leak-game">
                    <div class="game-icon">🚰</div>
                    <div class="game-title">ടാപ്പ് ദ ലീക്ക്</div>
                    <div class="game-desc"> ജലഹാനി തടയാം!</div>
                </div>
                <div class="game-card" data-route="trash-matching-game">
                    <div class="game-icon">🧠</div>
                    <div class="game-title">ട്രാഷ് മാച്ചിംഗ്</div>
                    <div class="game-desc">ഓർത്തുവെക്കൂ, തുല്യമായവ കണ്ടെത്തൂ!</div>
                </div>
            </div>
        </div>
    `;
    $(page.body).append(menuHTML);

    // Click handler
    $(page.body).on('click', '.game-card', function () {
        const route = $(this).data('route');
        frappe.set_route(route);
    });
};

