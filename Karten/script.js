const list = document.querySelector('main');
var correct = Math.floor(Math.random() * 3) + 1
var correctSet = false
var flipped = false
var won = false

const wonCount = localStorage.getItem("won") || 0
const lostCount = localStorage.getItem("lost") || 0

if (wonCount == null){
    localStorage.setItem("won",0)
    localStorage.setItem("lost", 0)
}

document.querySelector("[data-wincount]").innerText = "Win Count: " + wonCount
document.querySelector("[data-lostcount]").innerText = "Lost Count: " + lostCount

function iscorrect(id){
    return id == correct
}

function finish(){
    cards.forEach(card => {
        card.style.opacity = 0
    })
    
    setTimeout(() => {
        if (won == true){
            localStorage.setItem("won", parseInt(wonCount)+1)
            document.querySelector("[data-won]").style.display = "block"
        } else {
            localStorage.setItem("lost", parseInt(lostCount)+1)
            document.querySelector("[data-lost]").style.display = "block"
        }
    },500)
    setTimeout(() => {
        location.reload()
    },2000)
}

console.warn("correct id: " + correct)

for (var i = list.children.length; i >= 0; i--) {
    var id = Math.random() * i | 0
    list.appendChild(list.children[id]);
}

const cards = document.querySelectorAll("[data-card]")
cards.forEach(card => {
    if (correctSet == false) {
        const c = Math.floor(Math.random() * 3) + 1
        if(iscorrect(c)) {
              card.setAttribute("card-id", correct)
        }
    }
    card.addEventListener("click", (e) => {
        if (flipped == true) return
        flipped = true
        const target = e.target
        const id = target.getAttribute("card-id")
        var isCorrectCard = iscorrect(id)
        target.style.transform = "rotate3d(0, 1, 0, 90deg)"
        if (isCorrectCard){
            won = true
             setTimeout(() => {
                target.style.transform = "rotate3d(0, 1, 0, 180deg)"
                target.src = "gewonnen.png" 
             },500)
        } else {
             setTimeout(() => {
                target.style.transform = "rotate3d(0, 1, 0, 180deg)"
                target.src = "verloren.png"
            },500)
        }
        setTimeout(() => {
            finish()
         },1500)
    })
})