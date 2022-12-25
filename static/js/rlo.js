const URL = "https://rlo-stats.mopsfl20lol.repl.co/api/rlo/"
const responses = {}
const requests = [
    "players",
    "dynamic",
    "info",
]

const nicknames = {
    "Onearly": "andl",
    "Linux3G": "mcveysl",
    "Voymar": "police",
    "Andy_Hck": "police",
    "BroZz": "police",
    "jxst_nati": "107",
    "Freddie": "107",
    "CSYON": "107",
    "Gibbi": "107",
    "Page not found 404": "kartell",
    "Anna Steel/Jenny Saller": "kartell",
}

var _error = "",
    _loaded = false,
    _search = false,
    players = {}

function qs(element) {
    return document.querySelector(element)
}

async function loadContent() {
    //PLAYERS

    const playerList = qs("[data-plrlist]"),
        template = qs("[data-playertemplate]")

    players = responses.players.map(player => {
        const plrelement = template.content.cloneNode(true).children[0]

        return {
            name: player.name,
            id: player.id,
            ping: player.ping,
            nickname: nicknames[player.name] || "",
            element: plrelement
        }
    })

    players.sort((a, b) => { return a.id > b.id })

    players.forEach(player => {
        const name = player.element.querySelector("[data-name]"),
            id = player.element.querySelector("[data-playerid]"),
            ping = player.element.querySelector("[data-playerping]")

        name.innerText = player.name
        id.querySelector("[data-value]").innerText = player.id
        ping.querySelector("[data-value]").innerText = player.ping
        playerList.appendChild(player.element)


        player.element.addEventListener("click", (e) => {
            if (!e.target.getAttribute("id", "clicked")) {
                e.target.setAttribute("id", "clicked")

            } else {
                e.target.removeAttribute("id")
            }
        })
    });

    //ONLINE COUNT

    const playerCount = qs("[data-plrcount]")

    playerCount.innerText = `${responses.dynamic.clients}/${responses.dynamic.sv_maxclients}`
}

async function loadData() {
    qs("[data-loading]").classList.remove("none")
    qs("[data-content]").classList.add("none")
    for (let i = 0; i < requests.length; i++) {
        console.log("Requesting > " + requests[i])
        _error = ""
        qs("[data-ltext]").innerText = `Loading resource ${requests[i]}... (${i+1}/3)`
        if (_error != "") {
            qs("[data-error]").innerText = "Error while loading this resource"
        }
        const request = new Request(URL + requests[i]);
        try {
            await fetch(request).then(res => res.json()).then(data => {
                responses[requests[i]] = data
            })
        } catch (error) {
            _error = error
        }
    }

    console.log(`Requests finished. ${Object.keys(responses).length}/3 successfull.`)

    if (Object.keys(responses).length == 3) {
        qs("[data-ltext]").innerText = `Resources loaded! Loading content...`;
        await loadContent()

        setTimeout(() => {
            qs("[data-loading]").classList.add("none")
            qs("[data-content]").classList.remove("none")
        }, 1000)
    } else {
        qs("[data-ltext]").innerText = `Error`;
        qs("[data-error]").innerText = "Unable to load resources!"
    }
}

window.onload = () => {
    loadData()

    document.addEventListener("mousedown", (e) => {
        if (e.target != qs("[data-searchinput]") && e.target != qs("[data-search]")) {
            _search = false
            qs("[data-searchinput]").classList.add("hide")
            setTimeout(() => {
                qs("[data-searchinput]").style.display = "none"
            }, 500)
        }
    })

    qs("[data-search]").addEventListener("click", (e) => {
        _search = !_search

        if (_search) {
            qs("[data-searchinput]").style.display = "block"
            setTimeout(() => {
                qs("[data-searchinput]").classList.remove("hide")
            }, 100)
        } else {
            qs("[data-searchinput]").classList.add("hide")
            setTimeout(() => {
                qs("[data-searchinput]").style.display = "none"
            }, 500)
        }
    })

    qs("[data-searchinput]").addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase().replace(" ", "")
        players.forEach(player => {
            const isVisible = player.name.toLowerCase().includes(value) ||
                player.nickname.toLowerCase().includes(value) ||
                player.id.toString().includes(value)
            setTimeout(function() {
                player.element.classList.toggle("hide", !isVisible)
            }, 10)
        });
    })
}
