const username = document.querySelector("#username"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    registerForm = document.querySelector("#register-form"),
    message = document.querySelector("#message");

registerForm.addEventListener("submit", async (e)=> {
    e.preventDefault()

    try {
        const response = await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            })
        });

        const data = await response.json()
        if (!response.ok) {
            message.textContent = data.message;
            return;
        }
        localStorage.setItem("token", data.token);
        message.textContent = data.message;
        username.value = "";
        email.value = "";
        password.value = "";
    } catch (error) {
        console.error("Error registering user:", error);
    }
})