var url = document.getElementById("url"),
    back = document.getElementById("back")

window.onload = function() {
    url.innerHTML = "<strong>" + document.location.pathname + "</strong>"
    if (document.referrer !== "") {
        back.href = document.referrer
    } else {
        back.href = "./"
    }
    console.log("Oh no! An 404 :(")
}