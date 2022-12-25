const URL = "https://reallifeonline.cf:30120"
const ENDPOINTS = {
    players: "players.json",
}

const headers = new Headers()
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Accept', "application/json")
headers.append('Content-Type', "application/json")

async function getPlayers() {
    const data = await fetch(`http://localhost:3000/api/rlo/players`)
    const json = await data.json()
    return json
}

async function getDynamic() {
    const data = await fetch(`http://localhost:3000/api/rlo/dynamic`)
    const json = await data.json()
    return json
}

async function getInfo() {
    const data = await fetch(`http://localhost:3000/api/rlo/info`)
    const json = await data.json()
    return json
}

function qs(element) {
    return document.querySelector(element)
}

async function load() {
    qs("[data-players-list]").innerHTML = ""
    const dynamic = await getDynamic()
    const players = await getPlayers()
    const info = await getInfo()
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
    load()

    qs("[data-reload]").addEventListener("click", (e) => {
        load()
    })
}
