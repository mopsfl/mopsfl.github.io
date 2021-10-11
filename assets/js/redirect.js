var redirects = [
    youtube = "https://www.youtube.com/channel/UCFkA8OJnMdApJuIfOU42Qzg",
    github = "https://www.youtube.com/channel/UCFkA8OJnMdApJuIfOU42Qzg",
    twitter = "https://twitter.com/tonimahoni854",
    home = "https://mopsfl.github.io"
]

function redirect(id) {
    if (id == "youtube") {
        setTimeout(() => {
            console.warn("[mopsfl.github.io]: Redirected to youtube")
            window.location = redirects[0]
        }, 10);
    } else {
        if (id == "github") {
            setTimeout(() => {
                console.warn("[mopsfl.github.io]: Redirected to github")
                window.location = redirects[1]
            }, 10);
        } else {
            if (id == "twitter") {
                setTimeout(() => {
                    console.warn("[mopsfl.github.io]: Redirected to twitter")
                    window.location = redirects[2]
                }, 10);
            } else {
                console.warn("[mopsfl.github.io]: Invalid redirect id")
                window.location = redirects[3]
                return
            }
        }
    }
}

window.onload = function() {
    setTimeout(() => {
        redirect(redirect(window.location.search.split('id=')[1]))
    }, 3500);
}