

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const login_email = document.getElementById('login_email').value;
        const login_password = document.getElementById('login_password').value;

        try {
            const response = await fetch('/api/method/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `usr=${encodeURIComponent(login_email)}&pwd=${encodeURIComponent(login_password)}`
            });

            const result = await response.json();

            if (response.ok && result.message === 'Logged In') {
                // ✅ Redirect to desk/home or wherever you want
                window.location.href = '/games_menu';
            } else {
                loginMessage.textContent = result.message || 'Login failed';
            }
        } catch (err) {
            loginMessage.textContent = 'Server error. Try again later.';
            console.error(err);
        }
    });
});
