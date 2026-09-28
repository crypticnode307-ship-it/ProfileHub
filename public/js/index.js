const username = document.querySelector("#user-username"),
    email = document.querySelector("#user-email"),
    id = document.querySelector("#user-id"),
    role = document.querySelector("#user-role"),
    welcomeUsername = document.querySelector("#username"),
    logout = document.querySelector("#logout");

async function getUserData() {
    try{
        const token = localStorage.getItem("token");
        const response = await fetch("/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login.html";
            return;
        }

        const data = await response.json();
        username.textContent = data.username;
        email.textContent = data.email;
        id.textContent = data.id;
        role.textContent = data.role;
        welcomeUsername.textContent = data.username;
    }
    catch(e) {
        console.error("Error loading user data:", e);
    }
}

logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});

getUserData();