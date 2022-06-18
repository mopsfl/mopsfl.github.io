/**
 * clickOMator.js
 * 
 */

const _VERSION = 'v.0.0.2', playBtn = document.querySelector('[data-btn-play]'), settingsBtn = document.querySelector('[data-btn-settings]'), resetDataBtn = document.querySelector('[data-resetData]'), settingsDiv = document.querySelector('[data-settings]'), objColor = document.querySelector('[data-objColor]'), objSize = document.querySelector('[data-objSize]'), title = document.querySelector('[data-title]'), menu = document.querySelector('[data-menu]'), game = document.querySelector('[data-game]'), loading = document.querySelector('[data-loading]'), obj = document.querySelector('[data-obj]'), objTest = document.querySelector('[data-objtest]'), score = document.querySelector('[data-score]'), hscore = document.querySelector('[data-highscore]'), highscoreFrame = document.querySelector('[data-highscoreFrame]'), versionText = document.querySelector('[data-versionText]');
var playing = !1, cScore = 0, $_ = !1, cc = !1, gmenu = !1, _blckg = !1;
const standardData = {
	highscore: 0,
	objcolor: '#ffffff',
	objsize: 10
};
settingsBtn.addEventListener('click', () => {
	settingsDiv.style.maxHeight = settingsOpen();
}), playBtn.addEventListener('click', () => {
	play();
}), hscore.addEventListener('click', () => {
	highscoreFrame.style.maxHeight = highscoreFrameOpen();
}), resetDataBtn.addEventListener('click', () => {
	resetData();
}), objColor.onchange = e => {
	if (!e || null == e.target.value)
		return;
	const t = e.target.value, a = JSON.parse(atob(localStorage.getItem('clickomator_data')));
	a.objcolor = t, localStorage.setItem('clickomator_data', btoa(JSON.stringify(a)));
}, objSize.onchange = e => {
	if (!e || null == e.target.value)
		return;
	const t = e.target.value, a = JSON.parse(atob(localStorage.getItem('clickomator_data')));
	a.objsize = t, localStorage.setItem('clickomator_data', btoa(JSON.stringify(a)));
}, document.onkeydown = e => {
	if (!e || !playing || gmenu)
		return;
	27 == e.keyCode && (gmenu = !0, console.log('menu'));
}, document.onclick = e => {
	if (e.target == obj) {
		if (!playing || cc)
			return;
		const e = Date.now();
		$_ && e - $_ < 350 && (playing = !1, game.classList.toggle('fadehide'), resetData(), loading.innerText = '... Get some help ...', loading.classList.toggle('fadehide'), setTimeout(() => {
			loading.classList.toggle('fadehide'), menu.classList.toggle('fadehide'), title.classList.toggle('fadehide'), game.classList.toggle('fadehide'), game.classList.toggle('hide');
		}, 2500)), cScore += 1, changeObjPosition(), cc = !0, score.innerText = 'Score: ' + cScore, $_ = e, cScore > getHighscore() && setHighscore(cScore), setTimeout(() => {
			cc = !1;
		}, 230);
	} else {
		const t = e.clientX, a = e.clientY, o = Math.round(parseInt(obj.style.top)), l = Math.round(parseInt(obj.style.top));
		console.log(t, a, o, l, e);
	}
};
const handleData = () => {
		if (!localStorage)
			return;
		localStorage.getItem('clickomator_data') || localStorage.setItem('clickomator_data', btoa(JSON.stringify(standardData)));
		const e = JSON.parse(atob(localStorage.getItem('clickomator_data')));
		console.log(e), objColor.value = e.objcolor, objSize.value = e.objsize, hscore.innerText = 'Highscore: ' + e.highscore, score.innerText = 'Score: ' + cScore;
	}, play = () => {
		if (playing)
			return console.warn('Already playing dude?');
		menu.classList.toggle('fadehide'), loading.classList.toggle('fadehide'), loading.innerText = 'Loading...', title.classList.toggle('fadehide'), setTimeout(() => {
			console.warn('loaded'), loading.classList.toggle('fadehide'), game.classList.toggle('fadehide'), game.classList.contains('hide') && game.classList.toggle('hide'), changeObjPosition(), playing = !playing;
		}, 2000);
	}, changeObjPosition = () => {
		localStorage.getItem('clickomator_data') || handleData();
		const e = JSON.parse(atob(localStorage.getItem('clickomator_data'))), t = 0.9 * random(innerWidth), a = 0.9 * random(innerHeight);
		console.log(t, a), obj.style.position = 'Absolute', obj.style.backgroundColor = e.objcolor.toString(), obj.style.width = e.objsize.toString() + 'px', obj.style.height = e.objsize.toString() + 'px', obj.style.zIndex = '999', obj.style.left = t + 'px', obj.style.top = a + 'px';
	}, settingsOpen = () => {
		const e = settingsDiv.style.maxHeight.replace('px', '');
		return e < 100 ? '100px' : e > 0 ? '0px' : void 0;
	}, highscoreFrameOpen = () => {
		const e = highscoreFrame.style.maxHeight.replace('px', '');
		return e < 100 ? '100px' : e > 0 ? '0px' : void 0;
	}, random = e => Math.floor(Math.random() * e), getHighscore = () => {
		if (!localStorage)
			return;
		localStorage.getItem('clickomator_data') || localStorage.setItem('clickomator_data', btoa(JSON.stringify(standardData)));
		return JSON.parse(atob(localStorage.getItem('clickomator_data'))).highscore;
	}, setHighscore = e => {
		if (!localStorage && !playing)
			return;
		localStorage.getItem('clickomator_data') || localStorage.setItem('clickomator_data', btoa(JSON.stringify(standardData)));
		const t = JSON.parse(atob(localStorage.getItem('clickomator_data')));
		t.highscore = e, console.log(t), hscore.innerText = 'Highscore: ' + cScore, localStorage.setItem('clickomator_data', btoa(JSON.stringify(t)));
	}, resetData = () => {
		if (!localStorage)
			return;
		const e = JSON.parse(atob(localStorage.getItem('clickomator_data')));
		cScore = 0, e && (localStorage.removeItem('clickomator_data'), handleData(), console.warn('Data reseted'));
	};
window.onload = () => {
	handleData(), versionText.innerText = _VERSION.toString(), setInterval(() => {
		if (playing) {
			const e = obj.style.left.replace('px', ''), t = obj.style.top.replace('px', '');
			(e > innerWidth - 50 || t > innerHeight - 50) && changeObjPosition();
		}
		if (innerHeight < 130 || innerWidth < 250) {
			if (_blckg)
				return;
			_blckg = !0, playing = !1, loading.classList.toggle('fadehide'), loading.innerText = 'Your screen is too small to play this game!', game.classList.contains('fadehide') || game.classList.toggle('fadehide'), menu.classList.contains('fadehide') || menu.classList.toggle('fadehide'), title.classList.contains('fadehide') || title.classList.toggle('fadehide');
		} else {
			if (!_blckg)
				return;
			_blckg = !1, loading.classList.toggle('fadehide'), loading.innerText = '', menu.classList.toggle('fadehide'), title.classList.toggle('fadehide'), game.classList.contains('fadehide') || game.classList.toggle('fadehide');
		}
	}, 100);
};
