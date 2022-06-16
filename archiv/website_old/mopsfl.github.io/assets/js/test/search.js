var value = document.getElementById('search-value'),
    search = document.getElementById('search-submit'),
    content = document.querySelectorAll('p')


var parseQueryString = function() {
    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
            objURL[$1] = $3;
        }
    );
    return objURL;
};
var params = parseQueryString();

function Search() {
    var a = 0
    if (sessionStorage.getItem("search-value")) {
        sessionStorage.removeItem("search-value")
    }
    if (value.value !== null && value.value !== "") {
        sessionStorage.setItem("search-value", value.value)
        console.log("submit " + value.value)
        content.forEach(function(content) {
            content.classList.remove("show")
            content.classList.add("hide")
            var val = content.textContent.replace(" ", "").toLowerCase()
            if (val.includes(value.value.replace(" ", "").toLowerCase())) {
                console.log("found " + Array(val))
                a += 1
                content.classList.remove("hide")
                content.classList.add("show")
            } else {}
        });
        return console.log("final result: found " + a + " item(s)")
    } else {
        console.log("No search value was given")
        content.forEach(function(content) {
            content.classList.remove("hide")
            content.classList.add("show")
        })
    }
}

window.onload = function() {
    Search()
    search.addEventListener('click', (event) => {
        Search()
    })
    if (sessionStorage.getItem("search-value") !== null) {
        console.log("Search: " + sessionStorage.getItem("search-value"))
        value.value = sessionStorage.getItem("search-value")
    } else {
        console.log("no search value was found")
    }
}