const main = document.querySelector('[data-main]'), text_location = document.querySelector('[data-location]'), text_temperature = document.querySelector('[data-temperature]'), text_temperature_min = document.querySelector('[data-temperature-min]'), text_temperature_max = document.querySelector('[data-temperature-max]'), icon_weather = document.querySelector('[data-weather-icon]'), text_date = document.querySelector('[data-date]'), text_time = document.querySelector('[data-time]'), loading = document.querySelector('[data-loading]'), settings = document.querySelector('[data-settingsFrame]'), btn_Settings = document.querySelector('[data-settings]'), input_showDate = document.querySelector('[data-showDate]'), input_showTime = document.querySelector('[data-showTime]'), input_showLocation = document.querySelector('[data-showLocation]'), input_showTemperature = document.querySelector('[data-showTemp]'), input_showIcon = document.querySelector('[data-showIcon]'), standard_data = {
		lastFetch: 0,
		data: [],
		settings: {
			showDate: !0,
			showTime: !0,
			showLocation: !0,
			showTemperature: !0,
			showTemperatureMinMax: !0,
			showIcon: !0
		}
	}, API_KEY = '391d4c20a09de5b8f61e6bc5852c28e9', API_URL = new Request(`https://api.openweathermap.org/data/2.5/weather?lat=49.640621&lon=9.245574&appid=${ API_KEY }`), ICON_URL = 'https://openweathermap.org/img/wn/';
var req = null;
function calculateTemperature(e) {
	return Math.round(e - 273.15);
}
function loadWeatherIcon(e) {
	if (!e)
		return null;
	fetch(ICON_URL + e + '@2x.png').then(e => {
		e.ok && (icon_weather.src = e.url);
	});
}
function getMonthName(e) {
	let t = new Array();
	return t[0] = 'Januar', t[1] = 'Februar', t[2] = 'März', t[3] = 'April', t[4] = 'Mai', t[5] = 'Juni', t[6] = 'Juli', t[7] = 'August', t[8] = 'September', t[9] = 'Oktober', t[10] = 'November', t[11] = 'Dezember', t[e];
}
function getNamedDate() {
	let e = new Date();
	return `${ e.getDate() }. ${ getMonthName(e.getMonth()) }`;
}
function getTime(e) {
	let t = new Date(), a = t.getHours(), n = t.getMinutes(), o = t.getSeconds();
	return n = checkTime(n), o = checkTime(o), e ? `${ a }:${ n }:${ o }` : `${ a }:${ n }`;
}
function checkTime(e) {
	return e < 10 && (e = '0' + e), e;
}
function getDate() {
	let e = new Date(), t = e.getDate(), a = e.getMonth() + 1, n = e.getFullYear();
	return t < 10 && (t = '0' + t), a < 10 && (a = '0' + a), e = t + '.' + a + '.' + n, e;
}
function manageSettings() {
	let e = JSON.parse(atob(localStorage.getItem('salbenWeather_data'))).settings;
	e && (console.log(e), input_showDate.checked = e.showDate, input_showTime.checked = e.showTime, input_showLocation.checked = e.showLocation, input_showTemperature.checked = e.showTemperature, input_showIcon.checked = e.showTemperatureMinMax, e.showDate ? text_date.classList.remove('hide') : text_date.classList.add('hide'), e.showTime ? text_time.classList.remove('hide') : text_time.classList.add('hide'), e.showLocation ? text_location.classList.remove('hide') : text_location.classList.add('hide'), e.showTemperature ? text_temperature.classList.remove('hide') : text_temperature.classList.add('hide'), e.showTemperatureMinMax || (text_temperature_min.classList.add('hide'), text_temperature_max.classList.add('hide')), e.showIcon || icon_weather.classList.add('hide'));
}
function toggleLoading(e) {
	null == e && (e = 'Loading...'), loading.children[0].innerText = e.toString(), loading.classList.toggle('hide'), main.classList.toggle('hide');
}
function loadData() {
	localStorage.getItem('salbenWeather_data') || localStorage.setItem('salbenWeather_data', btoa(JSON.stringify(standard_data))), console.log(getDate()), console.log(getNamedDate()), console.log(getTime());
	let e = JSON.parse(atob(localStorage.getItem('salbenWeather_data')));
	if (e.lastFetch + 60000 < Date.now())
		e.lastFetch = Date.now(), toggleLoading('Loading...'), console.warn('Fetch new data'), req = fetch(API_URL).then(e => e.json()).then(function (t) {
			return text_location.innerText = t.name, text_temperature.innerText = `${ calculateTemperature(t.main.temp) }°`, text_temperature_min.innerText = `${ calculateTemperature(t.main.temp_min) }°`, text_temperature_max.innerText = `${ calculateTemperature(t.main.temp_max) }°`, loadWeatherIcon(t.weather[0].icon), text_date.innerText = `${ getNamedDate() } `, text_time.innerText = `${ getTime() }`, e.data = t, localStorage.setItem('salbenWeather_data', btoa(JSON.stringify(e))), console.log(t), setTimeout(() => {
				toggleLoading();
			}, 150);
		});
	else {
		const t = JSON.parse(atob(localStorage.getItem('salbenWeather_data'))).data;
		console.log(t), text_location.innerText = t.name, text_temperature.innerText = `${ calculateTemperature(t.main.temp) }°`, text_temperature_min.innerText = `${ calculateTemperature(t.main.temp_min) }°`, text_temperature_max.innerText = `${ calculateTemperature(t.main.temp_max) }°`, loadWeatherIcon(t.weather[0].icon), text_date.innerText = `${ getNamedDate() } `, text_time.innerText = `${ getTime() }`;
		const a = (e.lastFetch - (Date.now() - 60000)) / 1000;
		console.warn('Use cached data. New fetch in ' + Math.round(a) + ' seconds');
	}
}
window.onload = () => {
	loadData(), manageSettings(), btn_Settings.addEventListener('click', () => {
		settings.classList.toggle('closed'), btn_Settings.classList.toggle('open');
	}), input_showDate.addEventListener('change', () => {
		const e = JSON.parse(atob(localStorage.getItem('salbenWeather_data')));
		e.settings.showDate = input_showDate.checked, localStorage.setItem('salbenWeather_data', btoa(JSON.stringify(e))), manageSettings();
	}), input_showTime.addEventListener('change', () => {
		const e = JSON.parse(atob(localStorage.getItem('salbenWeather_data')));
		e.settings.showTime = input_showTime.checked, localStorage.setItem('salbenWeather_data', btoa(JSON.stringify(e))), manageSettings();
	}), input_showLocation.addEventListener('change', () => {
		const e = JSON.parse(atob(localStorage.getItem('salbenWeather_data')));
		e.settings.showLocation = input_showLocation.checked, localStorage.setItem('salbenWeather_data', btoa(JSON.stringify(e))), manageSettings();
	}), input_showTemperature.addEventListener('change', () => {
		const e = JSON.parse(atob(localStorage.getItem('salbenWeather_data')));
		e.settings.showTemperature = input_showTemperature.checked, localStorage.setItem('salbenWeather_data', btoa(JSON.stringify(e))), manageSettings();
	}), input_showIcon.addEventListener('change', () => {
		const e = JSON.parse(atob(localStorage.getItem('salbenWeather_data')));
		e.settings.showTemperatureMinMax = input_showIcon.checked, localStorage.setItem('salbenWeather_data', btoa(JSON.stringify(e))), manageSettings();
	});
};
