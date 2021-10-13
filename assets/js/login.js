var accounts = [{
    username: "mopsfl",
    password: "salbe",
    admin: true,
}, {
    username: "toni",
    password: "12345",
    admin: false,
}, ]

var username = document.getElementById("username"),
    password = document.getElementById("password"),
    login = document.getElementById("login"),
    notFound = document.getElementById("message")

function checkAccountData(username, password) {
    if (username && password) {
        for (let i = 0; i < accounts.length; i++) {
            if (username == accounts[i].username && password == accounts[i].password) {
                return true
            } else {
                return false
            }
        }
    }
}

login.addEventListener('click', (event) => {
    if (username.value && password.value) {
        window.location.search = "?u=" + username.value + "&p=" + password.value + "&c=true"
        if (checkAccountData(username.value, password.value)) {

        } else {
            window.location.search = "?e=0nf"
        }
    }
})

window.onload = function() {
    if (window.location.search == "?e=0nf") {
        message.style.display = "block"
        message.style.color = "red"
        message.innerHTML = "Invalid Username or Password"
    }
    if (window.location.search.split("c=")[1] == "true") {
        message.style.display = "block"
        message.style.color = "green"
        message.innerHTML = "Succesfully logged in"
    }
}