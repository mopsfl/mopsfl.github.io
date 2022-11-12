const main = document.querySelector('[data-main]'),
    loading = document.querySelector("[data-loading]"),
    weathericon = document.querySelector("[data-weathericon]")

let _IP = window._IP,
    ipInfo = {},
    lsKey = "weather_data",
    req = null,
    langIndex = 0

const standard_data = {
        lastFetches: {
            currentconditions: null,
            forecast: null,
            location: null,
        },
        data: {
            weather: {},
            forecast: {},
            location: {},
        },
        settings: {
            useIp: true,
            lang: "de",
        }
    },
    languages = [{
            code: "de",
            langName: "Deutsch",
        },
        {
            code: "en",
            langName: "English",
        },
        /*{
            code: "es",
            langName: "Spanish",
        },
        {
            code: "fr",
            langName: "French",
        },
        {
            code: "nl",
            langName: "Dutch",
        },
        {
            code: "ja",
            langName: "Japanese",
        }*/

    ],
    API_KEYS = {
        main: "GvLtbTTU3XOUi1hSdxfA247N3IdA1naO",
        second: "n1UYMojECGyTAvTFDNbw6h9PFA8xRRDa"
    },
    API_URLS = {
        weather: new Request(`https://dataservice.accuweather.com/currentconditions/v1/63897?apikey=${API_KEYS.main}`),
        forecast: new Request(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/63897?apikey=${API_KEYS.main}&details=false&metric=false`),
        location: new Request(`https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${API_KEYS.main}&q=${_IP}`),
        ip: "https://api.ipify.org?format=json"
    },
    ICON_URL = "",
    monthNames = { de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], ko: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"] },
    fetchCooldowns = {
        currentconditions: 62,
        location: 62,
        forecast: 242,
    },
    fontAwesomeIcons = {
        cloudy: "fa-cloud",
        suncloudy: "fa-cloud-sun",
        suncloudyrain: "fa-cloud-showers",
        sunny: "fa-sun",
        cloudymoon: "fa-cloud-moon",
        cloudymoonrain: "fa-cloud-moon-rain",
        rainy: "fa-cloud-rain",
        heavyrainy: "fa-cloud-showers-heavy",
        windy: "fa-wind",
        foggy: "fa-smog",
        thunder: "fa-cloud-bolt",
        sunthunder: "fa-cloud-bolt-sun",
        moon: "fa-moon",
        cloudmoon: "fa-cloud-moon",
        cloudmoonrain: "fa-cloud-moon-rain",
        moonthunder: "fa-cloud-bolt-moon",
        sunset: "fa-sunset",
        sunrise: "fa-sunrise",
        snow: "fa-snowflake",
        sleet: "fa-cloud-sleet",
        snowrain: "fa-cloud-hail-mixed",
        error: "fa-xmark"
    },
    weatherIconIds = {
        [0]: "fa-xmark",
        [1]: fontAwesomeIcons.sunny,
        [2]: fontAwesomeIcons.sunny,
        [3]: fontAwesomeIcons.suncloudy,
        [4]: fontAwesomeIcons.suncloudy,
        [5]: fontAwesomeIcons.suncloudy,
        [6]: fontAwesomeIcons.suncloudy,
        [7]: fontAwesomeIcons.cloudy,
        [8]: fontAwesomeIcons.cloudy,
        [9]: fontAwesomeIcons.foggy,
        [10]: fontAwesomeIcons.rainy,
        [11]: fontAwesomeIcons.rainy,
        [12]: fontAwesomeIcons.rainy,
        [13]: fontAwesomeIcons.thunder,
        [14]: fontAwesomeIcons.thunder,
        [15]: fontAwesomeIcons.thunder,
        [16]: fontAwesomeIcons.rainy,
        [17]: fontAwesomeIcons.cloudy,
        [18]: fontAwesomeIcons.suncloudy,
        [19]: fontAwesomeIcons.suncloudy,
        [20]: fontAwesomeIcons.snow,
        [21]: fontAwesomeIcons.snow,
        [22]: fontAwesomeIcons.snow,
        [23]: fontAwesomeIcons.rainy,
        [24]: fontAwesomeIcons.rainy,
        [25]: fontAwesomeIcons.snow,
        [26]: fontAwesomeIcons.sunny,
        [27]: fontAwesomeIcons.cloudy,
        [28]: fontAwesomeIcons.windy,
        [29]: fontAwesomeIcons.moon,
        [30]: fontAwesomeIcons.cloudmoon,
        [31]: fontAwesomeIcons.cloudmoon,
        [32]: fontAwesomeIcons.cloudmoon,
        [33]: fontAwesomeIcons.cloudmoon,
        [34]: fontAwesomeIcons.cloudy,
        [35]: fontAwesomeIcons.cloudmoonrain,
        [36]: fontAwesomeIcons.rainy,
        [37]: fontAwesomeIcons.thunder,
        [38]: fontAwesomeIcons.thunder,
        [39]: fontAwesomeIcons.cloudy,
        [40]: fontAwesomeIcons.cloudy,
    },
    debug = true


/*MAIN*/

window.onload = () => {
    main.classList.toggle('none')
    loadData()
    manageSettings()

    if (!window._IP) {
        console.log("Unable to get IP. Please disable some of your browser adddons (AdBlocker).")
    } else delete window._IP

    document.querySelector("[data-settings]").addEventListener("click", (e) => {
        document.querySelector(".settingsContainer").classList.contains("none") ? document.querySelector(".container").classList.add("none") : document.querySelector(".container").classList.remove("none")
        document.querySelector(".settingsContainer").classList.contains("none") ? document.querySelector(".settingsContainer").classList.remove("none") : document.querySelector(".settingsContainer").classList.add("none")
    })

    document.querySelector("[data-sback]").addEventListener("click", (e) => {
        document.querySelector(".settingsContainer").classList.contains("none") ? document.querySelector(".container").classList.add("none") : document.querySelector(".container").classList.remove("none")
        document.querySelector(".settingsContainer").classList.contains("none") ? document.querySelector(".settingsContainer").classList.remove("none") : document.querySelector(".settingsContainer").classList.add("none")
    })

    document.querySelector("[data-lang]").addEventListener("click", (e) => {
        const data = getData()
        if (Object.keys(languages)[langIndex++]) {
            langIndex = parseInt(langIndex) % Object.keys(languages).length
        } else {
            langIndex = 0
        }
        console.log(`Set language to ${languages[langIndex].code} (${languages[langIndex].langName})`)

        e.target.querySelector("[data-lang-value]").innerText = languages[langIndex].langName

        data.settings.lang = languages[langIndex].code
        saveData(data)

        forceFetch(true)
    })

    document.querySelector("[data-weathericonsetting]").addEventListener("click", (e) => {
        const data = getData()


    })
}

//FUNCTIONS

/**
 * 
 * @returns {Object} Object
 */

function getData() {
    if (!localStorage.getItem(lsKey)) return standard_data
    const data = JSON.parse(atob(lzw_decode(decodeURIComponent(localStorage[lsKey]))))
    return data
}

function saveData(data) {
    localStorage.setItem(lsKey, encodeURIComponent(lzw_encode(btoa(JSON.stringify(data)))))
}

/**
 * 
 * @param {Number} kelvin 
 * @returns {Number} Celsius
 */

function calculateTemperature(kelvin) {
    return Math.round(kelvin - 273.15)
}

function setWeatherIcon(iconid) {
    if (iconid == null) return "'iconid' not specified."

    Object.keys(fontAwesomeIcons).forEach(e => {
        if (weathericon.classList.contains(fontAwesomeIcons[e])) {
            weathericon.classList.replace(fontAwesomeIcons[e], weatherIconIds[iconid])
        }
    })
    if (weatherIconIds[iconid]) {
        weathericon.style.color = "white"
        weathericon.classList.add(weatherIconIds[iconid])
        if (weatherIconIds[iconid] == "fa-xmark") {
            weathericon.style.color = "red"
        }
    } else weathericon.style.color = "red"

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
    let settingsData = getData().settings

    if (settingsData.lang) {
        langIndex = languages.findIndex(lang => lang.code === settingsData.lang)
        setElementText("[data-lang-value]", languages[langIndex].langName)

        console.log(`Set language to ${languages[langIndex].code} (${languages[langIndex].langName})`)

        if (langIndex === -1) {
            langIndex = 0
            setElementText("[data-lang-value]", languages[langIndex].langName)
            console.log(`Set language to ${languages[langIndex].code} (${languages[langIndex].langName})`)
        }
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
    let settingsData = getData().settings
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
    let data = getData()
    if (data) {
        data.settings[key] = value
        saveData(data)
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

/**
 * @param {string} name Name of the cookie
 * @param {string} value Value of the cookie
 * @param {number} exdays Days to expire
 * @example setCookie("lang", "de", 1)
 */

function setCookie(name, value, exdays) {
    var d, expires;
    exdays = exdays || 1;
    d = new Date();
    d.setTime(d.getTime() + (exdays + 2460601000));
    expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

/**
 * 
 * @param {string} name Name of the cookie 
 * @returns string
 * @example getCookie("lang")
 */

function getCookie(name) {
    var cookie, c;
    const cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        c = cookies[i].split('=');
        if (c[0] == name) {
            return c[1];
        }
    }
    return "";
}

function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        } else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase = currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i = 0; i < out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        } else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

function forceFetch(ovr) {
    r = RegExp('^http[s]?:\/\/((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])');

    if (r.test(this.location.href) || ovr) {
        const data = getData()

        Object.keys(data.lastFetches).forEach(d => {
            data.lastFetches[d] = data.lastFetches[d].lastFetches / (data.lastFetches[d].lastFetches * 2)
        })

        saveData(data)
        loadData()
    }
}

function loadData() {
    if (!getData()) saveData(standard_data)
    const ldata = getData()

    /**CURRENTCONDITIONS**/
    if (ldata.lastFetches.currentconditions == null) {
        ldata.lastFetches.currentconditions = Date.now() - (fetchCooldowns.currentconditions * 60000 * 2);
        saveData(ldata)
    }
    if (ldata.lastFetches.currentconditions + (fetchCooldowns.currentconditions * 60000) < Date.now()) {
        ldata.lastFetches.currentconditions = Date.now()
        toggleLoading("Loading...")
        console.warn(`[CURRENTCONDITION]: Fetch new data. (lang: ${languages[langIndex].code})`)
        fetch(`${API_URLS.weather.url}&language=${languages[langIndex].code || "de"}`)
            .then(res => res.json())
            .then(data => {
                ldata.data.weather = data
                saveData(ldata)

                setElementText("[data-temperature-value]", data[0].Temperature.Metric.Value + "°")
                setElementText("[data-weathertext]", data[0].WeatherText)
                setWeatherIcon(data[0].WeatherIcon)

                return setTimeout(() => {
                    toggleLoading()
                }, 150)
            })
            .catch(err => {
                console.error(err)
                toggleLoading()
                toggleLoading("We were unable to load the data. Please try again!")
            })
    } else {
        const data = getData().data

        if (data.weather[0]) {
            setElementText("[data-temperature-value]", data.weather[0].Temperature.Metric.Value + "°")
            setElementText("[data-weathertext]", data.weather[0].WeatherText)
            setWeatherIcon(data.weather[0].WeatherIcon)
        } else console.warn("Unable to get weather data from cache.")

        const newFetchMin = secondsToMinute((ldata.lastFetches.currentconditions - (Date.now() - (fetchCooldowns.currentconditions * 60000))) / 1000).min
        const newFetchSec = secondsToMinute((ldata.lastFetches.currentconditions - (Date.now() - (fetchCooldowns.currentconditions * 60000))) / 1000).sec
        console.warn(`[CURRENTCONDITION]: Used cached data. New fetch in ${Math.round(newFetchMin)} minutes and ${Math.round(newFetchSec)} seconds.`)
    }

    /**LOCATION**/
    if (ldata.lastFetches.location == null) {
        ldata.lastFetches.location = Date.now() - (fetchCooldowns.location * 60000 * 2);
        saveData(ldata)
    }

    if (ldata.lastFetches.location + (fetchCooldowns.location * 60000) < Date.now()) {
        ldata.lastFetches.location = Date.now()
        toggleLoading("Loading...")
        console.warn(`[LOCATION]: Fetch new data. (lang: ${languages[langIndex].code})`)
        fetch(`${API_URLS.location.url}&language=${languages[langIndex].code || "de"}`)
            .then(res => res.json())
            .then(data => {
                ldata.data.location = data
                saveData(ldata)

                const location = {
                    city: data.ParentCity.LocalizedName || "Unknown",
                    country: data.AdministrativeArea.LocalizedName || "Unknown",
                }

                setElementText("[data-location]", `${location.city}, ${location.country}`)

                return setTimeout(() => {
                    toggleLoading()
                }, 150)
            })
            .catch(err => {
                console.error(err)
                toggleLoading()
                toggleLoading("We were unable to load the data. Please try again!")
            })
    } else {
        const data = getData().data

        if (Object.keys(data.location).length > 0) {
            const location = {
                city: data.location.ParentCity ? data.location.ParentCity.LocalizedName : "Unknown",
                country: data.location.ParentCity ? data.location.AdministrativeArea.LocalizedName : "Unknown",
            }
            setElementText("[data-location]", `${location.city}, ${location.country}`)
        } else console.warn("Unable to get location data from cache.")

        const newFetchMin = secondsToMinute((ldata.lastFetches.location - (Date.now() - (fetchCooldowns.location * 60000))) / 1000).min
        const newFetchSec = secondsToMinute((ldata.lastFetches.location - (Date.now() - (fetchCooldowns.location * 60000))) / 1000).sec
        console.warn(`[LOCATION]: Used cached data. New fetch in ${Math.round(newFetchMin)} minutes and ${Math.round(newFetchSec)} seconds.`)
    }

    /**FORECAST**/
    if (ldata.lastFetches.forecast == null) {
        ldata.lastFetches.forecast = Date.now() - (fetchCooldowns.forecast * 60000 * 2);
        saveData(ldata)
    }

    if (ldata.lastFetches.forecast + (fetchCooldowns.forecast * 60000) < Date.now()) {
        ldata.lastFetches.forecast = Date.now()
        toggleLoading("Loading...")
        console.warn(`[FORECAST]: Fetch new data. (lang: ${languages[langIndex].code})`)
        fetch(`${API_URLS.forecast.url}&language=${languages[langIndex].code  || "de"}`)
            .then(res => res.json())
            .then(data => {
                ldata.data.forecast = data
                saveData(ldata)

                const forecast = {
                    today: {
                        minmax: {
                            min: fahrenheitToCelsius(data.DailyForecasts[0].Temperature.Minimum.Value),
                            max: fahrenheitToCelsius(data.DailyForecasts[0].Temperature.Maximum.Value)
                        }
                    }
                }
                setElementText("[data-max-value] > [data-value]", forecast.today.minmax.max + "°")
                setElementText("[data-min-value] > [data-value]", forecast.today.minmax.min + "°")

                return setTimeout(() => {
                    toggleLoading()
                }, 150)
            })
            .catch(err => {
                console.error(err)
                toggleLoading()
                toggleLoading("We were unable to load the data. Please try again!")
            })
    } else {
        const data = getData().data
        if (Object.keys(data.forecast).length > 0) {
            const forecast = {
                today: {
                    minmax: {
                        min: fahrenheitToCelsius(data.forecast.DailyForecasts[0].Temperature.Minimum.Value),
                        max: fahrenheitToCelsius(data.forecast.DailyForecasts[0].Temperature.Maximum.Value)
                    }
                }
            }

            setElementText("[data-max-value] > [data-value]", forecast.today.minmax.max + "°")
            setElementText("[data-min-value] > [data-value]", forecast.today.minmax.min + "°")
        } else console.warn("Unable to get forecast data from cache.")

        const newFetchMin = secondsToMinute((ldata.lastFetches.forecast - (Date.now() - (fetchCooldowns.forecast * 60000))) / 1000).min
        const newFetchSec = secondsToMinute((ldata.lastFetches.forecast - (Date.now() - (fetchCooldowns.forecast * 60000))) / 1000).sec
        console.warn(`[FORECAST]: Used cached data. New fetch in ${Math.round(newFetchMin)} minutes and ${Math.round(newFetchSec)} seconds.`)
    }
}

if (debug) {

}
