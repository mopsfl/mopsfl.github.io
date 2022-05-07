const template = document.querySelector("[data-game-template]")
const list = document.querySelector("[data-game-items]")
const searchInput = document.querySelector("[data-search]")

const request = new Request('https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON')
const devTest = false

let games = []

function cardClicked(a) {
    const element = a.lastElementChild
    if (!element) return
    if (!element.getAttribute("id", "clicked")) {
        element.setAttribute("id", "clicked")

    } else {
        element.removeAttribute("id")
    }
}

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase().replace(" ", "")
    games.forEach(game => {
        const isVisible = game.name.toLowerCase().includes(value) ||
            game.publisher.toLowerCase().includes(value) ||
            game.name.toLowerCase().replace(" ", "").includes(value) ||
            game.publisher.toLowerCase().replace(" ", "").includes(value) ||
            game.url.toLowerCase().replace(" ", "").includes(value) ||
            game.id.toString().includes(value)

        setTimeout(function() {
            game.element.classList.toggle("hide", !isVisible)
        }, 250)
    })
})

fetch(request)
    .then(res => res.json())
    .then(data => {
        if (document.querySelector(".loading")) {
            document.querySelector(".loading").remove()
            document.querySelector("main").classList.remove("hide")
        }
        if (!devTest) {
            games = data.map(game => {
                const card = template.content.cloneNode(true).children[0]
                const name = card.querySelector("[data-name]")
                const id = card.querySelector("[data-id]")
                const link = card.querySelector("[data-link]")
                const publisher = card.querySelector("[data-pub]")
                const publisher2 = card.querySelector("[data-pub2]")
                const store = card.querySelector("[data-store]")

                name.textContent = game.title
                publisher.textContent = game.publisher + " - " + game.store
                id.innerText = "ID: " + game.id
                publisher2.innerText = "Publisher: " + game.publisher
                if (game.store == "Epic") {
                    store.innerText = "Store: Epic Games"
                } else {
                    store.innerText = "Store: " + game.store
                }
                if (game.steamUrl) {
                    link.setAttribute("href", game.steamUrl)
                } else {
                    link.remove()
                }
                list.append(card)
                return {
                    name: game.title,
                    publisher: game.publisher,
                    store: game.store,
                    id: game.id,
                    url: game.steamUrl,
                    element: card,

                    genres: [
                        game.genres
                    ]
                }
            });
        } else {
            const card = template.content.cloneNode(true).children[0]
            const name = card.querySelector("[data-name]")
            const link = card.querySelector("[data-link]")
            const publisher = card.querySelector("[data-id]")

            link.setAttribute("href", "https://mopsfl.github.io")
            name.textContent = "Test"
            publisher.textContent = "Test"
            card.id = "test"
            list.append(card)
        }
    });
