const main = document.querySelector('[data-main]')
const text_location = document.querySelector("[data-location]")
const text_temperature = document.querySelector("[data-temperature]")
const text_temperature_min = document.querySelector("[data-temperature-min]")
const text_temperature_max = document.querySelector("[data-temperature-max]")
const icon_weather = document.querySelector("[data-weather-icon]")
const text_date = document.querySelector("[data-date]")
const text_time = document.querySelector("[data-time]")
const loading = document.querySelector("[data-loading]")
const settings = document.querySelector("[data-settingsFrame]")
const btn_Settings = document.querySelector("[data-settings]")

const input_showDate = document.querySelector("[data-showDate]")
const input_showTime = document.querySelector("[data-showTime]")
const input_showLocation = document.querySelector("[data-showLocation]")
const input_showTemperature = document.querySelector("[data-showTemp]")
const input_showIcon = document.querySelector("[data-showIcon]")

const standard_data = {
    lastFetch: 0,
    data: [],
    settings: {
        showDate: true,
        showTime: true,
        showLocation: true,
        showTemperature: true,
        showTemperatureMinMax: true,
        showIcon: true,
    }
}

const API_KEY = "391d4c20a09de5b8f61e6bc5852c28e9"
const API_URL = new Request(`https://api.openweathermap.org/data/2.5/weather?lat=49.640621&lon=9.245574&appid=${API_KEY}`)
const ICON_URL = "https://openweathermap.org/img/wn/"

var req = null

/*MAIN*/

window.onload = () => {
    loadData()
    manageSettings()

    btn_Settings.addEventListener('click', () => {
        settings.classList.toggle("closed")
        btn_Settings.classList.toggle("open")
    })

    //SETTINGS

    input_showDate.addEventListener('change', () => {
        const data = JSON.parse(atob(localStorage.getItem("salbenWeather_data")))
        data.settings.showDate = input_showDate.checked
        localStorage.setItem("salbenWeather_data", btoa(JSON.stringify(data)))
        manageSettings()
    })

    input_showTime.addEventListener('change', () => {
        const data = JSON.parse(atob(localStorage.getItem("salbenWeather_data")))
        data.settings.showTime = input_showTime.checked
        localStorage.setItem("salbenWeather_data", btoa(JSON.stringify(data)))
        manageSettings()
    })

    input_showLocation.addEventListener('change', () => {
        const data = JSON.parse(atob(localStorage.getItem("salbenWeather_data")))
        data.settings.showLocation = input_showLocation.checked
        localStorage.setItem("salbenWeather_data", btoa(JSON.stringify(data)))
        manageSettings()
    })

    input_showTemperature.addEventListener('change', () => {
        const data = JSON.parse(atob(localStorage.getItem("salbenWeather_data")))
        data.settings.showTemperature = input_showTemperature.checked
        localStorage.setItem("salbenWeather_data", btoa(JSON.stringify(data)))
        manageSettings()
    })

    input_showIcon.addEventListener('change', () => {
        const data = JSON.parse(atob(localStorage.getItem("salbenWeather_data")))
        data.settings.showTemperatureMinMax = input_showIcon.checked
        localStorage.setItem("salbenWeather_data", btoa(JSON.stringify(data)))
        manageSettings()
    })
}

//FUNCTIONS

/**
 * 
 * @param {Number} kelvin 
 * @returns {Number} Celsius
 */

function calculateTemperature(kelvin) {
    return Math.round(kelvin - 273.15)
}

function loadWeatherIcon(id) {
    if (!id) return null
    fetch(ICON_URL + id + "@2x.png")
        .then(icon => {
            if (!icon.ok) return;
            icon_weather.src = icon.url
        })
}

function getMonthName(month) {
    let monthName = new Array()
    monthName[0] = "Januar"
    monthName[1] = "Februar"
    monthName[2] = "März"
    monthName[3] = "April"
    monthName[4] = "Mai"
    monthName[5] = "Juni"
    monthName[6] = "Juli"
    monthName[7] = "August"
    monthName[8] = "September"
    monthName[9] = "Oktober"
    monthName[10] = "November"
    monthName[11] = "Dezember"
    return monthName[month]
}

function getNamedDate() {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1

    return `${dd}. ${getMonthName(mm)}`
}

/**
 * 
 * @param {boolean} sec Show seconds
 * @returns 
 */

function getTime(sec) {
    let today = new Date()
    let h = today.getHours()
    let m = today.getMinutes()
    let s = today.getSeconds()
    m = checkTime(m)
    s = checkTime(s)
    if (sec) {
        return `${h}:${m}:${s}`
    } else return `${h}:${m}`
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}

function getDate() {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + '.' + mm + '.' + yyyy
    return today
}

function manageSettings() {
    let settingsData = JSON.parse(atob(localStorage.getItem("salbenWeather_data"))).settings
    if (settingsData) {
        console.log(settingsData)

        input_showDate.checked = settingsData.showDate
        input_showTime.checked = settingsData.showTime
        input_showLocation.checked = settingsData.showLocation
        input_showTemperature.checked = settingsData.showTemperature
        input_showIcon.checked = settingsData.showTemperatureMinMax

        if (!settingsData.showDate) { text_date.classList.add("hide") } else {
            text_date.classList.remove("hide")
        }
        if (!settingsData.showTime) { text_time.classList.add("hide") } else {
            text_time.classList.remove("hide")
        }
        if (!settingsData.showLocation) { text_location.classList.add("hide") } else {
            text_location.classList.remove("hide")
        }
        if (!settingsData.showTemperature) {
            text_temperature.classList.add("hide")
        } else {
            text_temperature.classList.remove("hide")
        }
        if (!settingsData.showTemperatureMinMax) {
            text_temperature_min.classList.add("hide")
            text_temperature_max.classList.add("hide")
        }
        if (!settingsData.showIcon) {
            icon_weather.classList.add("hide")
        }
    }
}

/**
 * 
 * @param {string} text Text do show while loading 
 */

function toggleLoading(text) {
    if (text == null) text = "Loading..."
    loading.children[0].innerText = text.toString()
    loading.classList.toggle('hide')
    main.classList.toggle('hide')
}

function loadData() {
    if (!localStorage.getItem("salbenWeather_data")) localStorage.setItem("salbenWeather_data", btoa(JSON.stringify(standard_data)))
    console.log(getDate())
    console.log(getNamedDate())
    console.log(getTime())
    let ldata = JSON.parse(atob(localStorage.getItem("salbenWeather_data")))
    if (ldata.lastFetch + 60000 < Date.now()) {
        ldata.lastFetch = Date.now()
        toggleLoading("Loading...")
        console.warn("Fetch new data")
        req = fetch(API_URL)
            .then(res => res.json())
            .then(function(data) {
                text_location.innerText = data.name
                text_temperature.innerText = `${calculateTemperature(data.main.temp)}°`
                text_temperature_min.innerText = `${calculateTemperature(data.main.temp_min)}°`
                text_temperature_max.innerText = `${calculateTemperature(data.main.temp_max)}°`
                loadWeatherIcon(data.weather[0].icon)
                text_time.innerText = `${getNamedDate()} ${getTime()}`

                ldata.data = data
                localStorage.setItem("salbenWeather_data", btoa(JSON.stringify(ldata)))

                console.log(data)

                return setTimeout(() => {
                    toggleLoading()
                }, 150)
            })
    } else {
        const data = JSON.parse(atob(localStorage.getItem("salbenWeather_data"))).data
        console.log(data)

        text_location.innerText = data.name
        text_temperature.innerText = `${calculateTemperature(data.main.temp)}°`
        text_temperature_min.innerText = `${calculateTemperature(data.main.temp_min)}°`
        text_temperature_max.innerText = `${calculateTemperature(data.main.temp_max)}°`
        loadWeatherIcon(data.weather[0].icon)
        text_date.innerText = `${getNamedDate()} `
        text_time.innerText = `${getTime()}`

        const newFetch = (ldata.lastFetch - (Date.now() - 60000)) / 1000
        console.warn("Use cached data. New fetch in " + Math.round(newFetch) + " seconds")
    }
}