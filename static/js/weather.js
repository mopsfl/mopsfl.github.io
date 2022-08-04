const main = document.querySelector('[data-main]')
const loading = document.querySelector("[data-loading]")

const standard_data = {
    lastFetch: null,
    data: {
        weather: {},
        forecast: {},
        location: {},
    },
    settings: {
        useIp: true,
    }
}

let _IP = window._IP,
    ipInfo = {},
    lsKey = "weather_data",
    req = null

const API_KEYS = {
    main: "GvLtbTTU3XOUi1hSdxfA247N3IdA1naO",
    second: "n1UYMojECGyTAvTFDNbw6h9PFA8xRRDa"
}
const API_URLS = {
    weather: new Request(`https://dataservice.accuweather.com/currentconditions/v1/994921?apikey=${API_KEYS.main}&language=de`),
    forecast: new Request(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/994921?apikey=${API_KEYS.main}&language=de&details=false&metric=false`),
    location: new Request(`https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${API_KEYS.main}&q=${_IP}&language=de`),
    ip: "https://api.ipify.org?format=json"
}
const ICON_URL = "",
    monthNames = {
        de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        ko: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    },
    fetchCooldown = 5

/*MAIN*/

window.onload = () => {
    main.classList.toggle('none')
    loadData()
    manageSettings()
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

function getMonthName(month, lang) {
    if (!lang) lang = "de"
    if (!monthNames[lang]) lang = "de"
    return monthNames[lang][month]
}

function getNamedDate() {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()

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
    //today = dd + '.' + mm + '.' + yyyy
    today = yyyy + '-' + mm + '-' + dd
    return today
}

function epochToDate(epoch) {
    let date = new Date(epoch * 1000)
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yyyy = date.getFullYear()
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    //date = dd + '.' + mm + '.' + yyyy
    date = yyyy + '-' + mm + '-' + dd
    return date
}

/**
 * 
 * @param {string} date (example: "2020-01-01")
 * @returns {number} epoch
 * @example dateToEpoch("2022-01-08") returns 1641600000
 */

function dateToEpoch(date) {
    let epoch = new Date(date)
    epoch = epoch.getTime() / 1000
    return epoch
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5 / 9)
}

function manageSettings() {
    let settingsData = JSON.parse(atob(localStorage.getItem(lsKey))).settings
    if (settingsData) {
        console.log(settingsData)
    }
}

async function loadIPInfo() {
    let i
    await fetch(API_URLS.location)
        .then(res => res.json())
        .then(data => {
            ipInfo = data
            i = ipInfo
        })
    return i
}

async function loadLocationData() {
    let _info
    await loadIPInfo().then(info => {
        _info = info
        ipInfo = _info
    })
}

function checkSetting(key) {
    let settingsData = JSON.parse(atob(localStorage.getItem(lsKey))).settings
    if (settingsData) {
        return settingsData[key]
    }
}

/**
 * 
 * @param {string} key Setting key
 * @param {string} value Setting value
 */

function setSetting(key, value) {
    let data = JSON.parse(atob(localStorage.getItem(lsKey)))
    if (data) {
        console.log(data)
        data.settings[key] = value
        localStorage.setItem(lsKey, btoa(JSON.stringify(data)))
    }
}

/**
 * 
 * @param {string} selector HTML selector
 * @returns HTMLElement
 */

function qs(selector) {
    return document.querySelector(selector)
}

/**
 * @param {string} text Text to show while loading 
 */

function toggleLoading(text) {
    if (text == null) text = "Loading..."
    loading.children[0].innerText = text.toString()
    loading.classList.toggle('none')
    main.classList.toggle('none')
}

/**
 * @param {string} selector query selector
 * @param {string} text Text to set
 */

function setElementText(selector, text) {
    if (!qs(selector)) return
    qs(selector).innerText = text
}

/**
 * @param {number} seconds Seconds
 * @returns Minutes and seconds
 * @example secondsToMinute(65) returns { min: 1, sec: 5 }
 */

function secondsToMinute(seconds) {
    let minutes = Math.floor(seconds / 60)
    let seconds_ = seconds % 60
    return {
        min: `${minutes}`,
        sec: `${seconds_}`
    }
}

function loadData() {
    if (!localStorage.getItem(lsKey)) localStorage.setItem(lsKey, btoa(JSON.stringify(standard_data)))
    console.log(getDate())
    console.log(getNamedDate())
    console.log(getTime())
    let ldata = JSON.parse(atob(localStorage.getItem(lsKey)))
    console.log(ldata)
    if (ldata.lastFetch != null) {
        if (ldata.lastFetch + (fetchCooldown * 60000) < Date.now()) {
            ldata.lastFetch = Date.now()
            toggleLoading("Loading...")
            console.warn("Fetch new data")
            fetch(API_URLS.weather)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    ldata.data.weather = data
                    localStorage.setItem(lsKey, btoa(JSON.stringify(ldata)))

                    setElementText("[data-temperature-value]", data[0].Temperature.Metric.Value + "°")

                    return setTimeout(() => {
                        toggleLoading()
                    }, 150)
                })
                /****************************************************************/
            if (checkSetting("useIp") == true) {
                if (window._IP && window._IP != null) {
                    loadLocationData().then(function() {
                        const locationData = {
                            city: ipInfo.ParentCity.LocalizedName,
                            country: ipInfo.AdministrativeArea.LocalizedName
                        }

                        ldata.data.location = locationData
                        localStorage.setItem(lsKey, btoa(JSON.stringify(ldata)))

                        setElementText("[data-location]", `${locationData.city}, ${locationData.country}`)
                    })
                } else {
                    console.warn("Unable to get IP. Please enable your internet connection or disable your ad blocker.")
                }
            }
        } else {
            const data = JSON.parse(atob(localStorage.getItem(lsKey))).data
            console.log(data)

            if (data.weather[0]) {
                setElementText("[data-temperature-value]", data.weather[0].Temperature.Metric.Value + "°")
            } else console.warn("Unable to get weather data from cache.")

            if (data.location) {
                setElementText("[data-location]", `${data.location.city}, ${data.location.country}`)
            } else console.warn("Unable to get location data from cache.")

            const newFetchMin = secondsToMinute((ldata.lastFetch - (Date.now() - (fetchCooldown * 60000))) / 1000).min
            const newFetchSec = secondsToMinute((ldata.lastFetch - (Date.now() - (fetchCooldown * 60000))) / 1000).sec
            console.warn("Used cached data. New fetch in " + Math.round(newFetchMin) + " minutes and " + Math.round(newFetchSec) + " seconds.")
        }
    } else {
        ldata.lastFetch = Date.now() - (fetchCooldown * 60000)
        localStorage.setItem(lsKey, btoa(JSON.stringify(ldata)))
        loadData()
    }
}
