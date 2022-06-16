var url = document.getElementById("url"),
    back = document.getElementById("back")

window.onload = function() {
    url.innerHTML = "<strong>" + document.location.pathname + "</strong>"
    console.log("Oh no! An 404 :(")
}