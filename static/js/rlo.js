(() => {
    const URL = "https://mopsflgithubio.floda854.repl.co"
    const responses = {}
    const requests = [
        "players",
        "dynamic",
        "info",
    ]

    const nicknames = {
        "Onearly": "andl 107",
        "Linux3G": "mcveysl mafia",
        "Lilith McVeysl": "mcveysl mafia",
        "Voymar": "police",
        "Andy_Hck": "police",
        "BroZz": "police",
        "jxst_nati": "107",
        "Freddie": "107",
        "EspressoDepresso": "107",
        "Vinz": "107",
        "CSYON": "107 police",
        "Gibbi": "107",
        "XxVCelinexX": "107",
        "Page not found 404": "kartell",
        "Anna Steel/Jenny Saller": "kartell",
        "Käthe": "amr",
        "Steffi White": "kartell",
    }

    var _error = "",
        _load = true,
        _search = false,
        _loadImages = true,
        _players = {}

    function qs(element) {
        return document.querySelector(element)
    }

    function getDiscordId(player) {
        if (player === undefined) return console.warn("no player object given")
        let _id = ""
        player.identifiers.forEach(i => {
            if (i.includes("discord")) {
                _id = i.replace("discord:", "")
            }
        })
        return _id
    }

    async function getDiscordInfo(id) {
        if (!id) return console.warn("no discord id given")
        if (!_loadImages) return
        let _d = {}
        const request = new Request(`${URL}/api/discord/avatar/${id}`)
        await fetch(request)
            .then(res => res.json())
            .then(data => {
                _d = data
                return data
            })
        return _d
    }

    function showContent() {
        if (!_load) return
        qs("[data-loading]").classList.add("none")
        qs("[data-content]").classList.remove("none")
    }

    async function loadContent() {
        try {
            //PLAYERS
            const playerList = qs("[data-plrlist]"),
                template = qs("[data-playertemplate]")

            let current = 0

            playerList.innerHTML = ""

            if (responses.players == undefined || !responses.players) {
                qs("[data-ltext]").innerText = `Error`
                qs("[data-error]").innerText = "Resource 'player' is invalid."
                _load = false
                return console.warn("Resource 'players' is invalid.")
            }

            _players = responses.players.map(player => {
                const plrelement = template.content.cloneNode(true).children[0]

                return {
                    name: player.name,
                    id: player.id,
                    ping: player.ping,
                    identifiers: player.identifiers,
                    nickname: nicknames[player.name] || "",
                    element: plrelement
                }
            })

            _players.sort((a, b) => { return a.id > b.id })

            _players.forEach(async player => {
                const name = player.element.querySelector("[data-plrname]"),
                    id = player.element.querySelector("[data-playerid]"),
                    ping = player.element.querySelector("[data-playerping]"),
                    avatar = player.element.querySelector("[data-discordavatar]")

                current++;
                const discordinfo = await getDiscordInfo(getDiscordId(player))

                name.innerText = player.name
                id.querySelector("[data-value]").innerText = player.id
                ping.querySelector("[data-value]").innerText = player.ping

                try {
                    if (_loadImages) {
                        if (discordinfo && discordinfo.avatarURL) {
                            avatar.src = discordinfo.avatarURL
                        } else {
                            if (discordinfo && discordinfo.defaultAvatarURL) {
                                avatar.src = discordinfo.defaultAvatarURL
                            } else {
                                avatar.src = "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
                            }
                        }
                    } else avatar.src = "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
                } catch (error) {
                    console.error(error)
                    avatar.src = "https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
                }

                playerList.appendChild(player.element)

                player.element.addEventListener("click", (e) => {
                    if (!e.target.getAttribute("id", "clicked")) {
                        e.target.setAttribute("id", "clicked")
                        avatar.style.width = "100px"
                        avatar.style.height = "100px"
                    } else {
                        avatar.style.width = "25px"
                        avatar.style.height = "25px"
                        e.target.removeAttribute("id")
                    }
                })
            });

            //ONLINE COUNT
            const playerCount = qs("[data-plrcount]")
            playerCount.innerText = `${responses.dynamic.clients}/${responses.dynamic.sv_maxclients}`

            setInterval(() => {
                if (playerList.childNodes.length >= responses.dynamic.clients) showContent()
            }, 1000)
        } catch (error) {
            console.error(error)
            qs("[data-ltext]").innerText = `Error`;
            qs("[data-error]").innerText = error
        }
    }

    async function loadData() {
        if (!_load) return
        try {
            qs("[data-loading]").classList.remove("none")
            qs("[data-content]").classList.add("none")
            for (let i = 0; i < requests.length; i++) {
                console.log("Requesting > " + requests[i])
                _error = ""
                qs("[data-ltext]").innerText = `Loading resource ${requests[i]}... (${i+1}/3)`
                if (_error != "") {
                    qs("[data-error]").innerText = "Error while loading this resource"
                    console.warn(_error)
                }
                const request = new Request(URL + "/api/rlo/" + requests[i]);
                try {
                    await fetch(request).then(res => res.json()).then(data => {
                        responses[requests[i]] = data
                        if (data.code && data.code == 429) {
                            _error = data.message
                            qs("[data-ltext]").innerText = `Error`
                            qs("[data-error]").innerText = data.message
                        }
                    })
                } catch (error) {
                    _error = error
                }
            }

            console.log(`Requests finished. ${Object.keys(responses).length}/3 successfull.`)

            if (Object.keys(responses).length == 3) {
                qs("[data-ltext]").innerText = `Resources loaded! Loading content...`;
                await loadContent()
            } else {
                qs("[data-ltext]").innerText = `Error`;
                qs("[data-error]").innerText = "Unable to load resources!"
            }
        } catch (error) {
            console.error(error)
            qs("[data-ltext]").innerText = `Error`;
            qs("[data-error]").innerText = error
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
            _players.forEach(player => {
                const isVisible = player.name.toLowerCase().includes(value) ||
                    player.nickname.toLowerCase().includes(value) ||
                    player.id.toString().includes(value)
                setTimeout(function() {
                    player.element.classList.toggle("hide", !isVisible)
                }, 10)
            });
        })
    }
})();
