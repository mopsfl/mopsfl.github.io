function saveValue() {
    var value = document.getElementById("value").value,
        text = document.getElementById("text")
    if (value !== null && text !== null) {
        localStorage.setItem("value", value)
        text.innerHTML = "Value: " + localStorage.getItem("value")
        document.cookie = "value=" + localStorage.getItem("value")
        console.log("Saved: " + value)
    }
}

function resetValue() {
    localStorage.removeItem("value")
    window.location.reload()
}

window.onload = function() {
    setTimeout(function() {
        text.innerHTML = "Value: " + localStorage.getItem("value")
        if (localStorage.getItem("value") !== null) {
            text.innerHTML = "Value: " + localStorage.getItem("value")
        } else {
            text.innerHTML = "Value: no data found"
        }
    }, 1000)
}