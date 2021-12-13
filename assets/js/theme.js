const themes = [
    dark = [
        primaryColor = "#171717",
        secondaryColor = "#313131",
        textColor = "#cacaca",
    ],
    light = [
        primaryColor = "#ffffff",
        secondaryColor = "#eff0f1",
        textColor = "#606c71",
    ]
]

const settings = [
    cookieName = "theme",
    standard = "light"
]

const theme_picker = document.getElementById("theme-picker"),
    theme_icon_light = document.getElementById("theme-icon-light"),
    theme_icon_dark = document.getElementById("theme-icon-dark")

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, refreshPage) {
    document.cookie = `${name}=${value}; domain=.github.io`
    if (refreshPage === true) {
        return true, location.reload();
    }
    return true
}

function updateCookie() {
    let color_theme = getCookie("color_theme")
    if (color_theme !== undefined) {
        return console.log("Current color_theme: " + color_theme)
    } else {
        let set = setCookie("color_theme", "light")
        if (set == true) {
            console.log("Set color_theme to: light")
        }
    }
}

function updateTheme(theme) {
    if (theme !== undefined) {
        if (theme === "dark") {
            document.body.style.background = themes[0][0]
            document.body.style.color = themes[0][2]
            theme_icon_light.classList.add("hidden")
            theme_icon_light.classList.remove("visible")
            theme_icon_dark.classList.remove("hidden")
            theme_icon_dark.classList.add("visible")
        } else if (theme === "light") {
            document.body.style.background = themes[1][0]
            document.body.style.color = themes[1][2]
            theme_icon_light.classList.remove("hidden")
            theme_icon_light.classList.add("visible")
            theme_icon_dark.classList.add("hidden")
            theme_icon_dark.classList.remove("visible")
        }
    } else {
        console.warn("Can't find theme [" + theme + "]")
    }
}

theme_picker.addEventListener('click', async(event) => {
    let color_theme = getCookie("color_theme")
    if (color_theme !== undefined) {
        if (color_theme === "light") {
            return setCookie("color_theme", "dark", true)
        } else if (color_theme === "dark") {
            return setCookie("color_theme", "light", true)
        } else {
            return setCookie("color_theme", "light", true)
        }
    }
})

window.onload = function() {
    updateCookie();
    updateTheme(getCookie("color_theme"))
}