var valueSave = document.getElementById("value"),
    save = document.getElementById("save"),
    load = document.getElementById("load"),
    load2 = document.getElementById("npload"),
    clear = document.getElementById("clear"),
    msg = document.getElementById("valueDisplay"),
    types = document.getElementById("type_select")


save.addEventListener("click", (event) => {
    if (types.value == "LocalStorage") {
        var value = JSON.stringify({ value: valueSave.value })
        localStorage.setItem("save_test", value)
    } else if (types.value == "Cookies") {
        var value = JSON.stringify({ value: valueSave.value })
        document.cookie = "save_test=" + value
    }
})


load.addEventListener("click", (event) => {
    if (types.value == "LocalStorage") {
        if (localStorage.getItem("save_test") !== null) {
            if (JSON.parse(localStorage.getItem("save_test")).value !== "") {
                var value = JSON.parse(localStorage.getItem("save_test"))
                msg.innerHTML = value.value
            } else {
                msg.innerHTML = "null"
            }
        } else {
            msg.innerHTML = "No data found"
        }
    } else if (types.value == "Cookies") {

    }
})

npload.addEventListener("click", (event) => {
    if (localStorage.getItem("save_test") !== null) {
        if (JSON.parse(localStorage.getItem("save_test")).value !== "") {
            var value = localStorage.getItem("save_test")
            msg.innerHTML = value
        } else {
            msg.innerHTML = "null"
        }
    } else {
        msg.innerHTML = "No data found"
    }
})

clear.addEventListener("click", (event) => {
    localStorage.removeItem("save_test")
    msg.innerHTML = "No data found"
})