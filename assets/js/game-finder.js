const template = document.querySelector("[data-game-template]")
const list = document.querySelector("[data-game-items]")
const searchInput = document.querySelector("[data-search]")
var cards = document.querySelectorAll("[data-game-card]")

const request = new Request('https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON')

let games = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase().replace(" ", "")
    games.forEach(game => {
        const isVisible = game.name.toLowerCase().includes(value) ||
            game.publisher.toLowerCase().includes(value) ||
            game.name.toLowerCase().replace(" ", "").includes(value) ||
            game.publisher.toLowerCase().replace(" ", "").includes(value)

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
        games = data.map(game => {
            const card = template.content.cloneNode(true).children[0]
            const name = card.querySelector("[data-name]")
            const publisher = card.querySelector("[data-id]")

            name.textContent = game.title
            publisher.textContent = game.publisher
            card.id = game.sortName
            list.append(card)
            return {
                name: game.title,
                sortName: game.sortName,
                publisher: game.publisher,
                id: game.id,
                url: game.steamUrl,


                element: card,
            }
        });
    });
