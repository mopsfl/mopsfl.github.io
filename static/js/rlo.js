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

async function api() {
    const data = await fetch(`http://reallifeonline.cf:30120/players.json`, { mode: "no-cors", headers: headers })
    const json = await data.json()
    return json
}

api().then(res => {
    console.log(res);
})