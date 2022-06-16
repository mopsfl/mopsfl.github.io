const themes = [
    dark = [
        primaryColor = "#171717",
        secondaryColor = "#313131",
        textColor = "#cacaca",
        other = [
            shadow1Color = "#000",
        ]
    ],
    light = [
        primaryColor = "#ffffff",
        secondaryColor = "#eff0f1",
        textColor = "#606c71",
        other = [
            shadow1Color = "#5b5b5b",
        ]
    ]
]

const theme_picker = document.getElementById("theme-picker"),
    theme_picker_more = document.getElementById("theme-picker-more"),
    theme_icon_light = document.getElementById("theme-icon-light"),
    theme_icon_light_more = document.getElementById("theme-icon-light-more"),
    theme_icon_dark_more = document.getElementById("theme-icon-dark-more"),
    theme_icon_dark = document.getElementById("theme-icon-dark"),
    header_shadow = document.getElementById("header-shadow")


function updateThemeStorage() {
    let color_theme = localStorage.getItem("color_theme")
    if (color_theme !== null) {
        console.log("Current color_theme: " + color_theme)
    } else {
        localStorage.setItem("color_theme", "light")
        console.log("Set color_theme to: light")
    }
}

function updateTheme(theme) {
    if (theme !== null) {
        if (theme === "dark") {
            document.body.style.background = themes[0][0]
            document.body.style.color = themes[0][2]
            header_shadow.style.outline = `solid ${themes[0][3][0]}`
            theme_icon_light.classList.add("hidden")
            theme_icon_light.classList.remove("visible")
            theme_icon_dark.classList.remove("hidden")
            theme_icon_dark.classList.add("visible")

            theme_icon_light_more.classList.add("hidden")
            theme_icon_light_more.classList.remove("visible")
            theme_icon_dark_more.classList.remove("hidden")
            theme_icon_dark_more.classList.add("visible")
        } else if (theme === "light") {
            document.body.style.background = themes[1][0]
            document.body.style.color = themes[1][2]
            header_shadow.style.outline = `solid ${themes[1][3][0]}`
            theme_icon_light.classList.remove("hidden")
            theme_icon_light.classList.add("visible")
            theme_icon_dark.classList.add("hidden")
            theme_icon_dark.classList.remove("visible")

            theme_icon_light_more.classList.remove("hidden")
            theme_icon_light_more.classList.add("visible")
            theme_icon_dark_more.classList.add("hidden")
            theme_icon_dark_more.classList.remove("visible")
        }
    } else {
        console.warn("Can't find theme [" + theme + "]")
    }
}

function updateStorage(name, theme, reloadPage) {
    localStorage.setItem(name, theme)
    if (reloadPage === true) {
        location.reload()
    }
    return console.log("Saved color_theme " + theme)
}

theme_picker.addEventListener('click', async(event) => {
    let color_theme = localStorage.getItem("color_theme")
    if (color_theme !== null) {
        if (color_theme === "light") {
            return updateStorage("color_theme", "dark", true)
        } else if (color_theme === "dark") {
            return updateStorage("color_theme", "light", true)
        } else {
            return updateStorage("color_theme", "light", true)
        }
    }
})

theme_picker_more.addEventListener('click', async(event) => {
    let color_theme = localStorage.getItem("color_theme")
    if (color_theme !== null) {
        if (color_theme === "light") {
            return updateStorage("color_theme", "dark", true)
        } else if (color_theme === "dark") {
            return updateStorage("color_theme", "light", true)
        } else {
            return updateStorage("color_theme", "light", true)
        }
    }
})

updateThemeStorage();
updateTheme(localStorage.getItem("color_theme"))