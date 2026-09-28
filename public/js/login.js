const username = document.querySelector("#username"),
    loginForm = document.querySelector("#login-form"),
    password = document.querySelector("#password"),
    message = document.querySelector("#message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });
        const data = await response.json();
        if(response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "/index.html";
            return;
        }
        message.textContent = data.message;
    } catch (error) {
        message.textContent = "Unable to log in right now.";
        console.error("Error logging in:", error);
    }
});