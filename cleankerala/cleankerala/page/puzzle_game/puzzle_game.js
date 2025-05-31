frappe.pages['puzzle-game'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        // title: 'Puzzle Game',
        single_column: true
    });

    
    // ✅ Immediately hide the navbar on page load
    $('.navbar').hide();


    
    // Add styles
    const style = `
    <style>
        .puzzle-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 30px;
            background-color: #00796b;
        }
        .puzzle-header img {
            width: 80px;
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
            transition: background-color 0.3s ease;
            font-family: 'Noto Sans Malayalam', sans-serif;
            z-index: 1000;
        }
        .menu-button:hover {
            background-color: #004d40;
        }
        .puzzle-title {
            text-align: center;
            color: #004d40;
            font-size: 28px;
            margin: 20px 0;
            font-weight: bold;
            font-family: 'Noto Sans Malayalam', sans-serif;
        }
        .puzzle-container {
            background: #ffffff;
            padding: 20px;
            margin: 20px auto;
            max-width: 700px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-family: 'Noto Sans Malayalam', sans-serif;
        }
        .puzzle-question {
            font-size: 20px;
            margin-bottom: 15px;
        }
        .puzzle-option {
            display: block;
            padding: 10px;
            margin: 10px 0;
            background-color: #b2dfdb;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .puzzle-option:hover {
            background-color: #80cbc4;
        }
    </style>
    `;
    $(page.body).append(style);

    // Header with logos
    const header = `
        <div class="puzzle-header">
            <img src="/files/logo-left.png" alt="Left Logo">
            <img src="/files/logo-right.png" alt="Right Logo">
        </div>
    `;
	$(wrapper).prepend(header);


    // Title
    const title = `<div class="puzzle-title">സ്വച്ഛ കേരള പസിൽ</div>`;
    $(page.body).append(title);

    //menu button
    const menuButton = `<button class="menu-button">Menu</button>`;
    $(page.body).append(menuButton);

    // Menu button click event
    $(page.body).on('click', '.menu-button', function () {
        window.location.href = '/games_menu';
    });


    // Puzzle container
    const container = `<div class="puzzle-container" id="quiz-area"></div>`;
    $(page.body).append(container);




    // Quiz Data (Malayalam)
    const questions = [
        {
            question: "മാലിന്യങ്ങൾ എങ്ങനെ നമുക്ക് കൈകാര്യം ചെയ്യാം?",
            options: ["ചെറുതായി വേര്‍തിരിച്ചു സംസ്കരിക്കുക", "തെറ്റായ സ്ഥലങ്ങളില്‍ കളയുക", "കത്തിക്കുക"],
            answer: 0
        },
        {
            question: "ജലം സംരക്ഷിക്കാനുള്ള ഏറ്റവും നല്ല മാര്‍ഗം ഏതാണ്?",
            options: ["കിണറുകള്‍ നശിപ്പിക്കുക", "പൈപ്പുകൾ നിത്യേന പരിശോധിക്കുക", "വൃത്തിയാകാത്ത ടാങ്ക് ഉപയോഗിക്കുക"],
            answer: 1
        },
        {
            question: "പ്ലാസ്റ്റിക് നു പകരം എന്താണ് നല്ലത്?",
            options: ["പ്ലാസ്റ്റിക് ബാഗുകള്‍", "കുപ്പി ബോട്ടിലുകള്‍", "പേപ്പർ ബാഗുകൾ"],
            answer: 2
        },
        {
            question: "ശുദ്ധ ജലസ്രോതസ്സുകൾ എങ്ങനെ സംരക്ഷിക്കും?",
            options: ["മാലിന്യങ്ങൾ വലിച്ചെറിയുക", "വൃത്തിയാക്കുക", "വറ്റിക്കുക"],
            answer: 1
        },
        {
            question: "ശുചിത്വം പാലിക്കേണ്ടത് ആരുടെ ഉത്തരവാദിത്വമാണ്?",
            options: ["ഉദ്യോഗസ്ഥര്‍ മാത്രം", "എല്ലാവരും", "സാധാരണക്കാർ മാത്രം"],
            answer: 1
        },
        {
            question: "പൊതുസ്ഥലങ്ങളില്‍ മാലിന്യങ്ങള്‍ എവിടെ വയ്ക്കണം?",
            options: ["തറയില്‍", "റോഡ് സൈഡിൽ", "ചവറ്റുകുട്ടയില്‍"],
            answer: 2
        },
        {
            question: "പുതിയ വൃക്ഷം നട്ടുപിടിപ്പിക്കുന്നത് എന്തിനാണ് സഹായിക്കുന്നത്?",
            options: ["വായു മലിനീകരണം കുറയ്ക്കാൻ", "ജലം കളയാന്‍", "അഴുക്കുചാലുകള്‍ തികയ്ക്കാന്‍"],
            answer: 0
        },
        {
            question: "കേടായ ടാപ്പ്  ഉണ്ടെങ്കിൽ എന്ത് ചെയ്യണം?",
            options: ["ശ്രദ്ധിക്കേണ്ടതില്ല", "നശിപ്പിക്കണം", "അതു അടയ്ക്കണം"],
            answer: 2
        },
        {
            question: "മാലിന്യങ്ങൾ എങ്ങനെ സംസ്കരിക്കാം?",
            options: ["കമ്പോസ്റ്റിംഗ്", "മണ്ണിലേയ്ക്ക് ഒഴിക്കുക", "നദിയിലേയ്ക്ക് വിടുക"],
            answer: 0
        },
        {
            question: "ശുചിത്വം പാലിച്ചാലെന്താണ് ലഭിക്കുക?",
            options: ["ആരോഗ്യം", "വികൃതമായ പരിസരം", "ജലമില്ലായ്മ"],
            answer: 0
        }
    ];


    let current = 0;
    let score = 0;

    function loadQuestion() {
		if (current >= questions.length) {
        // Quiz over
        let result = `<div class="puzzle-question">നിങ്ങളുടെ സ്‌കോർ: ${score} / 10</div>`;
        if(score >= 7) {
            result += `<div style="color: green; font-size: 20px;">അഭിനന്ദനങ്ങൾ! നിങ്ങൾ വിജയിച്ചു 🎉</div>`;
        } else {
            result += `<div style="color: red; font-size: 20px;">ക്ഷമിക്കണം, നിങ്ങൾ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക 🙁</div>`;
        }

        // Add Restart button
        result += `<button id="restart-btn" style="margin-top:20px; padding:10px 20px; font-size:16px; cursor:pointer;">പുനരാരംഭിക്കുക</button>`;

        $("#quiz-area").html(result);

        // Restart button click handler
        $("#restart-btn").click(function() {
            current = 0;
            score = 0;
            loadQuestion();
        });

        // Redirect after delay if win
        if(score >= 7) {
            setTimeout(() => {
                frappe.set_route('congratulation');
            }, 3000); // 3 seconds delay to enjoy the win message
        }

        return;
    }


		const q = questions[current];
		let html = `<div class="puzzle-question">${current + 1}. ${q.question}</div>`;
		q.options.forEach((opt, idx) => {
			html += `<div class="puzzle-option" data-index="${idx}">${opt}</div>`;
		});

		$("#quiz-area").html(html);
	}

    // Option click handler
    $(page.body).on("click", ".puzzle-option", function () {
		const selected = parseInt($(this).attr("data-index"));
		if (selected === questions[current].answer) {
			score++;
			frappe.show_alert({ message: "✅ ശരിയാണ്! 😊", indicator: 'green' });
		} else {
			frappe.show_alert({ message: "❌ തെറ്റാണ്! 😟", indicator: 'red' });
		}
		current++;
		setTimeout(loadQuestion, 800); // small delay before next question
	});
	
	

    // Start quiz
    loadQuestion();
};
