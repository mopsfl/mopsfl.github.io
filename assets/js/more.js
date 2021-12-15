var button = document.getElementById("button-more"),
    navMore = document.getElementById("page-header-nav-more"),
    navMoreOpened = false,
    navOpen = "max-content",
    navClose = "0px"

button.addEventListener('click', (event) => {
    if (!navMoreOpened || navMore.style.maxHeight !== navOpen) {
        console.log("Open navMenu")
        navMoreOpened = true
        navMore.style.maxHeight = navOpen

    } else if (navMoreOpened || navMore.style.maxHeight == navOpen) {
        console.log("Close navMenu")
        navMoreOpened = false
        navMore.style.maxHeight = navClose
    } else {
        return console.log("Unexpected error")
    }
})
