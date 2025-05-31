
frappe.pages['congratulation'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        single_column: true
    });

    // Add styles and animation CSS (your existing styles here)
    const style = `
        <style>
            .congrats-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 80vh;
                text-align: center;
                font-family: 'Noto Sans Malayalam', sans-serif;
                color: #2e7d32;
                padding: 0 10px;
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

            .download-cert-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 8px 20px;
                background: #00796b;
                color: #fff;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Noto Sans Malayalam', sans-serif;
                z-index: 1000;
                transition: background-color 0.3s ease;
            }

            .download-cert-button:hover {
                background-color: #004d40;
            }

            .congrats-title {
                font-size: 48px;
                font-weight: bold;
                margin-bottom: 20px;
                animation: popIn 1s ease forwards;
            }

            .congrats-subtitle {
                font-size: 24px;
                margin-bottom: 40px;
                color: #4caf50;
                animation: fadeIn 2s ease forwards;
            }

            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #4caf50;
                animation: confetti-fall 3s linear infinite;
                opacity: 0.8;
                border-radius: 50%;
            }

            @keyframes popIn {
                0% {
                    transform: scale(0);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes fadeIn {
                from {opacity: 0;}
                to {opacity: 1;}
            }

            @keyframes confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(500px) rotate(360deg);
                    opacity: 0;
                }
            }

            @media (max-width: 600px) {
                .congrats-title {
                    font-size: 28px;
                    margin-bottom: 12px;
                }
                .congrats-subtitle {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .menu-button, .download-cert-button {
                    padding: 6px 14px;
                    font-size: 14px;
                }
            }
        </style>
    `;
    $(page.body).append(style);

    // ✅ Immediately hide the navbar on page load
    $('.navbar').hide();

    // Menu button
    $(wrapper).append('<button class="menu-button">Menu</button>');

    // Download Certificate button
    $(wrapper).append('<button class="download-cert-button">Download Certificate</button>');

    // Menu button click
    $(wrapper).on('click', '.menu-button', function() {
        frappe.set_route('games-menu');
    });

    // Download certificate button click
    $(wrapper).on('click', '.download-cert-button', function() {
        frappe.call({
            method: "cleankerala.cleankerala.page.congratulation.congratulation.generate_certificate",
            args: {},
            callback: function(r) {
                if (r.message) {
                    let link = document.createElement('a');
                    link.href = "data:image/png;base64," + r.message;
                    link.download = "certificate.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    frappe.msgprint("Failed to generate certificate.");
                }
            }
        });
    });

    // Create confetti pieces dynamically
    function createConfetti() {
        const container = $('<div></div>');
        for (let i = 0; i < 30; i++) {
            const confetti = $('<div class="confetti"></div>');
            confetti.css({
                left: Math.random() * window.innerWidth + 'px',
                animationDelay: (Math.random() * 3) + 's',
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                width: (5 + Math.random() * 10) + 'px',
                height: (5 + Math.random() * 10) + 'px',
                top: (-10 - Math.random() * 100) + 'px',
                position: 'fixed',
                zIndex: 9999,
                borderRadius: (Math.random() > 0.5 ? '50%' : '0'),
            });
            container.append(confetti);
        }
        return container;
    }

    // Build the congratulation content
    const congratsHTML = `
        <div class="congrats-container">
            <div class="congrats-title">🎉 Congratulations! 🎉</div>
            <div class="congrats-subtitle">You won the game!</div>
        </div>
    `;
    $(page.body).append(congratsHTML);

    // Append confetti container
    const confettiContainer = createConfetti();
    $(page.body).append(confettiContainer);
};
