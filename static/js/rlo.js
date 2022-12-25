const URL = "https://reallifeonline.cf:30120"
const ENDPOINTS = {
    players: "players.json",
}

var dynamic = null,
    players = null,
    info = null

const headers = new Headers()
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Accept', "application/json")
headers.append('Content-Type', "application/json")

async function loadPlayers() {
    try {
        /*const data = await fetch(`lol.daki.cc:6054/api/rlo/players`)
        const json = await data.json()
        return json*/
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                players = JSON.parse(xhttp.response)
            }
        };
        xhttp.open("GET", "http://lol.daki.cc:6054/api/rlo/players", true);
        xhttp.send();
    } catch (error) {
        console.error(error)
    }
}

async function loadDynamic() {
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                dynamic = JSON.parse(xhttp.response)
            }
        };
        xhttp.open("GET", "http://lol.daki.cc:6054/api/rlo/dynamic", true);
        xhttp.send();
    } catch (error) {
        console.error(error)
    }
}

async function loadInfo() {
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = async function() {
            if (this.readyState == 4 && this.status == 200) {
                info = JSON.parse(xhttp.response)
                await load()
            }
        };
        xhttp.open("GET", "http://lol.daki.cc:6054/api/rlo/info", true);
        xhttp.send();
    } catch (error) {
        console.error(error)
    }
}

function qs(element) {
    return document.querySelector(element)
}

async function load() {
    qs("[data-players-list]").innerHTML = ""
    if (dynamic && dynamic.clients) {
        qs("[data-plr-count]").innerText = dynamic.clients + "/" + dynamic.sv_maxclients
    } else if (dynamic && dynamic.message) {
        console.error(dynamic.error)
        const plrElement = qs("[data-plrtemplate]").content.cloneNode(true).children[0]
        plrElement.querySelector("[data-name]").innerText = "Error while requesting dynamic.json"
        qs("[data-players-list]").appendChild(plrElement)
        return
    }
    if (players) {
        players.forEach(player => {
            const plrElement = qs("[data-plrtemplate]").content.cloneNode(true).children[0]
            plrElement.querySelector("[data-name]").innerText = `${player.name}`
            plrElement.querySelector("[data-id]").innerText = `(${player.id})`
            qs("[data-players-list]").appendChild(plrElement)
        });
    }
    if (info) {
        qs("[data-servername]").innerText = info.vars.sv_projectName.replaceAll("^", "").replaceAll("5", "").replaceAll("E0", "E") + " - SERVER STATS"
    }
}

window.onload = () => {
    //load()

    qs("[data-reload]").addEventListener("click", (e) => {
        load()
    })

    loadPlayers()
    loadDynamic()
    loadInfo()
}
