// Function to validate if password and confirm password match
function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Function to show success or error messages
function showMessage(text, isSuccess = false) {
    const msgDiv = $("#signup-message");
    msgDiv.removeClass("success error").addClass(isSuccess ? "success" : "error");
    msgDiv.text(text).show();
}

// Ensure the DOM is fully loaded before attaching event listeners
$(document).ready(function () {
    const form = $("#signup-form");

    if (form.length) {
        form.on("submit", function (e) {
            e.preventDefault();

            const email = $("#email").val();
            const full_name = $("#full_name").val();
            const password = $("#password").val();
            const confirm_password = $("#confirm_password").val();
            const mobile = $("#mobile").val();

            if (!validatePasswordMatch(password, confirm_password)) {
                showMessage("Passwords do not match.");
                return;
            }

            // Show loading spinner
            $("#btn-text").hide();
            $("#btn-spinner").show();

            // AJAX request to custom signup API (corrected for JSON)
            $.ajax({
                url: "/api/method/cleankerala.api.custom_signup",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    email: email,
                    full_name: full_name,
                    password: password,
                    mobile: mobile
                }),
                success: function (r) {
                    $("#btn-text").show();
                    $("#btn-spinner").hide();

                    if (r.message && typeof r.message === "object") {
                        showMessage("Signup successful! Redirecting...", true);
                        setTimeout(() => {
                            window.location.href = "/login";
                        }, 2000);
                    } else {
                        showMessage("Signup failed. Please try again.");
                    }
                },
                error: function (xhr) {
                    $("#btn-text").show();
                    $("#btn-spinner").hide();

                    let errorMsg = "password should be 8 character, must include simbols and special character";
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        if (typeof xhr.responseJSON.message === "string") {
                            errorMsg = xhr.responseJSON.message;
                        } else if (xhr.responseJSON.message.message) {
                            errorMsg = xhr.responseJSON.message.message;
                        }
                    }
                    showMessage(errorMsg);
                }
            });
        });
    } else {
        console.warn("Signup form (#signup-form) not found in the DOM.");
    }
});
