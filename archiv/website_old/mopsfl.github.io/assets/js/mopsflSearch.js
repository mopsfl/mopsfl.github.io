const searchInput = document.getElementById('search-input'),
    engine_select = document.getElementById('search-engine-type')

const localStorageName = "mopsflSearch_data"
const searchLinks = [
    google = "https://www.google.com/search?q=",
    bing = "https://www.bing.com/search?q=",
    yahoo = "https://search.yahoo.com/search?p=",
    duckduckgo = "https://duckduckgo.com/?q=",
    brave = "https://search.brave.com/search?q=",
    yandex = "https://yandex.com/search/?text=",
    giveWater = "https://search.givewater.com/serp?q=",
    internetArchive = "https://archive.org/search.php?query=",
    github = "https://github.com/search?q="
]

searchInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        if (searchInput.value !== "" || !searchInput.value.length <= 0) {
            console.log("search " + searchInput.value)
            const data = JSON.parse(localStorage.getItem(localStorageName))[0]
            if (data.selected_engine == "google") {
                window.open(searchLinks[0] + searchInput.value)
            } else if (data.selected_engine == "bing") {
                window.open(searchLinks[1] + searchInput.value)
            } else if (data.selected_engine == "yahoo") {
                window.open(searchLinks[2] + searchInput.value)
            } else if (data.selected_engine == "duckduckgo") {
                window.open(searchLinks[3] + searchInput.value)
            } else if (data.selected_engine == "brave") {
                window.open(searchLinks[4] + searchInput.value)
            } else if (data.selected_engine == "yandex") {
                window.open(searchLinks[5] + searchInput.value)
            } else if (data.selected_engine == "givewater") {
                window.open(searchLinks[6] + searchInput.value)
            } else if (data.selected_engine == "internetarchive") {
                window.open(searchLinks[7] + searchInput.value)
            } else if (data.selected_engine == "github") {
                window.open(searchLinks[8] + searchInput.value)
            } else {
                console.warn("Unable to search. Unsupported engine?")
            }
        } else {
            console.log("cannot search nothing lol")
        }
    }
})

engine_select.onchange = function(event) {
    const engine = event.target.value
    console.log("Changed & saved engine to [" + engine + "]")
    localStorage.setItem(localStorageName, JSON.stringify([{ selected_engine: engine }]))
}

if (localStorage.getItem(localStorageName) !== null) {
    const data = JSON.parse(localStorage.getItem(localStorageName))[0]
    engine_select.value = data.selected_engine
} else {
    localStorage.setItem(localStorageName, JSON.stringify([{ selected_engine: "google" }]))
}