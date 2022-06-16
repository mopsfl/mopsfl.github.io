/**
 * clickOMator.js
 * 
 */

const _VERSION = "v.0.0.2"

const playBtn = document.querySelector("[data-btn-play]")
const settingsBtn = document.querySelector("[data-btn-settings]")
const resetDataBtn = document.querySelector("[data-resetData]")
const settingsDiv = document.querySelector("[data-settings]")
const objColor = document.querySelector("[data-objColor]")
const objSize = document.querySelector("[data-objSize]")
const title = document.querySelector("[data-title]")
const menu = document.querySelector("[data-menu]")
const game = document.querySelector("[data-game]")
const loading = document.querySelector("[data-loading]")
const obj = document.querySelector("[data-obj]")
const objTest = document.querySelector("[data-objtest]")
const score = document.querySelector("[data-score]")
const hscore = document.querySelector("[data-highscore]")
const highscoreFrame = document.querySelector("[data-highscoreFrame]")
const versionText = document.querySelector("[data-versionText]")

var playing = false,
    cScore = 0,
    $_ = false,
    cc = false,
    gmenu = false,
    _blckg = false

const standardData = {
    highscore: 0,
    objcolor: "#ffffff",
    objsize: 10,
}

//MENU BUTTONS

settingsBtn.addEventListener("click", () => {
    settingsDiv.style.maxHeight = settingsOpen()
})

playBtn.addEventListener("click", () => {
    play()
})

hscore.addEventListener("click", () => {
    highscoreFrame.style.maxHeight = highscoreFrameOpen()
})

resetDataBtn.addEventListener("click", () => {
    resetData();
})

//SETTINGS

objColor.onchange = (e) => {
    if (!e || e.target.value == null) return
    const value = e.target.value
    const data = JSON.parse(atob(localStorage.getItem("clickomator_data")))

    data.objcolor = value
    localStorage.setItem("clickomator_data", btoa(JSON.stringify(data)))
}

objSize.onchange = (e) => {
    if (!e || e.target.value == null) return
    const value = e.target.value
    const data = JSON.parse(atob(localStorage.getItem("clickomator_data")))
    data.objsize = value
    localStorage.setItem("clickomator_data", btoa(JSON.stringify(data)))
}

//GAME MENU

document.onkeydown = (e) => {
    if (!e || !playing || gmenu) return
    const keyCode = e.keyCode
    if (keyCode == 27) {
        gmenu = true
        console.log("menu")
    }
}

//OBJ CLICK

document.onclick = (e) => {
    if (e.target == obj) {
        if (!playing || cc) return
        const time = Date.now()
        if ($_) {
            if ((time - $_) < 350) {
                playing = false
                game.classList.toggle("fadehide")
                resetData()
                loading.innerText = "... Get some help ..."
                loading.classList.toggle("fadehide")

                setTimeout(() => {
                    loading.classList.toggle("fadehide")
                    menu.classList.toggle("fadehide")
                    title.classList.toggle("fadehide")
                    game.classList.toggle("fadehide")
                    game.classList.toggle("hide")
                }, 2500)
            }
        }

        cScore += 1
        changeObjPosition()
        cc = true

        score.innerText = "Score: " + cScore
        $_ = time
        if (cScore > getHighscore()) {
            setHighscore(cScore)
        }

        setTimeout(() => {
            cc = false
        }, 230)
    } else {
        const x = e.clientX
        const y = e.clientY
        const xo = Math.round(parseInt(obj.style.top))
        const yo = Math.round(parseInt(obj.style.top))

        console.log(x, y, xo, yo, e)
    }
}

//FUNCTIONS

const handleData = () => {
    if (!localStorage) return
    if (!localStorage.getItem("clickomator_data")) localStorage.setItem("clickomator_data", btoa(JSON.stringify(standardData)))

    const data = JSON.parse(atob(localStorage.getItem("clickomator_data")))
    console.log(data)

    objColor.value = data.objcolor
    objSize.value = data.objsize
    hscore.innerText = "Highscore: " + data.highscore
    score.innerText = "Score: " + cScore
}

const play = () => {
    if (playing) return console.warn("Already playing dude?")

    menu.classList.toggle("fadehide")
    loading.classList.toggle("fadehide")
    loading.innerText = "Loading..."
    title.classList.toggle("fadehide")

    setTimeout(() => {
        console.warn("loaded")
        loading.classList.toggle("fadehide")
        game.classList.toggle("fadehide")
        if (game.classList.contains("hide")) game.classList.toggle("hide")
        changeObjPosition()
        playing = !playing
    }, 2000)
}

const changeObjPosition = () => {
    if (!localStorage.getItem("clickomator_data")) handleData()
    const data = JSON.parse(atob(localStorage.getItem("clickomator_data")))
    const x = random(innerWidth) * .9
    const y = random(innerHeight) * .9
    console.log(x, y)

    obj.style.position = "Absolute"
    obj.style.backgroundColor = data.objcolor.toString()
    obj.style.width = data.objsize.toString() + "px"
    obj.style.height = data.objsize.toString() + "px"
    obj.style.zIndex = "999"

    obj.style.left = x + "px"
    obj.style.top = y + "px"
}

const settingsOpen = () => {
    const value = settingsDiv.style.maxHeight.replace("px", "")
    if (value < 100) {
        return "100px"
    } else if (value > 0) return "0px"
}

const highscoreFrameOpen = () => {
    const value = highscoreFrame.style.maxHeight.replace("px", "")
    if (value < 100) {
        return "100px"
    } else if (value > 0) return "0px"
}

const random = (max) => {
    return Math.floor(Math.random() * max)
}

const getHighscore = () => {
    if (!localStorage) return
    if (!localStorage.getItem("clickomator_data")) localStorage.setItem("clickomator_data", btoa(JSON.stringify(standardData)))

    const data = JSON.parse(atob(localStorage.getItem("clickomator_data")))
    return data.highscore
}

const setHighscore = (value) => {
    if (!localStorage && !playing) return
    if (!localStorage.getItem("clickomator_data")) localStorage.setItem("clickomator_data", btoa(JSON.stringify(standardData)))

    const data = JSON.parse(atob(localStorage.getItem("clickomator_data")))
    data.highscore = value
    console.log(data)
    hscore.innerText = "Highscore: " + cScore

    localStorage.setItem("clickomator_data", btoa(JSON.stringify(data)))
}

const resetData = () => {
    if (!localStorage) return
    const data = JSON.parse(atob(localStorage.getItem("clickomator_data")))
    cScore = 0
    if (data) { localStorage.removeItem("clickomator_data") } else return
    handleData()
    console.warn("Data reseted")
}

//INIT

window.onload = () => {
    handleData()
    versionText.innerText = _VERSION.toString()

    setInterval(() => {
        if (playing) {
            const x = obj.style.left.replace("px", "")
            const y = obj.style.top.replace("px", "")
            if (x > innerWidth - 50 || y > innerHeight - 50) changeObjPosition()
        }

        if (innerHeight < 130 || innerWidth < 250) {
            if (_blckg) return
            _blckg = true
            playing = false;
            loading.classList.toggle("fadehide")
            loading.innerText = "Your screen is too small to play this game!"
            if (!game.classList.contains("fadehide")) game.classList.toggle("fadehide")
            if (!menu.classList.contains("fadehide")) menu.classList.toggle("fadehide")
            if (!title.classList.contains("fadehide")) title.classList.toggle("fadehide")
        } else {
            if (!_blckg) return
            _blckg = false;
            loading.classList.toggle("fadehide")
            loading.innerText = ""
            menu.classList.toggle("fadehide")
            title.classList.toggle("fadehide")
            if (!game.classList.contains("fadehide")) game.classList.toggle("fadehide")
        }
    }, 100)
}