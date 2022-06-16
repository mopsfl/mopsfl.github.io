var redirects = [
    youtube = "https://www.youtube.com/channel/UCFkA8OJnMdApJuIfOU42Qzg",
    github = "https://github.com/mopsfl",
    twitter = "https://twitter.com/tonimahoni854",
    home = "../",
    norickroll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO",
]

var lastPage = document.referrer

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


function redirect(id) {
    if (id != undefined && !isNaN(id)) {
        try {
            window.open(redirects[id], "_self")
            console.log("Redirected to [" + redirects[id] + "]")
        } catch (error) {
            console.warn("Cannot redirect. [" + error + "]")
        }
    } else {
        console.warn("Invalid id [" + id + "]")
    }
}

window.onload = function() {
    setTimeout(() => {
        if (window.location.search != "") {
            if (params["r"] != undefined && params["r"]) {
                if (params["r"] == "youtube") {
                    console.log("Redirect to " + params["r"])
                    return redirect(0)
                } else if (params["r"] == "github") {
                    console.log("Redirect to " + params["r"])
                    return redirect(1)
                } else if (params["r"] == "twitter") {
                    console.log("Redirect to " + params["r"])
                    return redirect(2)
                } else if (params["r"] == "home") {
                    return redirect(3)
                } else if (params["r"] == "norickroll") {
                    return redirect(4)
                } else if (params["r"] == "test") {
                    document.getElementById("test").style.display = "block"
                } else {
                    console.warn("Invalid redirect id [" + params["r"] + "]")
                    return redirect(3)
                }
            } else {
                console.warn("Invalid redirect id [" + params["r"] + "]")
                redirect(3)
            }
        } else {
            console.warn("Invalid redirect format")
            redirect(3)
        }
    }, 0)
}