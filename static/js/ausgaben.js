const newBtn = document.querySelector('[data-new]'), itemList = document.querySelector('[data-list]'), delList = document.querySelector('[data-del-list]'), listTemplate = document.querySelector('[data-list-template]'), delTemplate = document.querySelector('[data-template-del]'), debugMsgTemplate = document.querySelector('[data-debugMsgTemplate]'), listDataTemplate = document.querySelector('[data-list-data-template]'), container = document.querySelector('[data-container]'), create = document.querySelector('[data-create]'), delf = document.querySelector('[data-delf]'), del = document.querySelector('[data-delete]'), form = document.querySelector('[data-form]'), input_name = document.querySelector('[data-form-name]'), input_desc = document.querySelector('[data-form-desc]'), input_color = document.querySelector('[data-form-color]'), cancel = document.querySelector('[data-cancel]'), canceldel = document.querySelector('[data-canceldel]'), submit = document.querySelector('[data-submit]'), submitdel = document.querySelector('[data-submitdel]'), text_location = document.querySelector('[data-location]'), debugConsoleBtn = document.querySelector('[data-debugConsoleBtn]'), debugConsole = document.querySelector('[data-debugConsole]'), debugLogs = document.querySelector('[data-debugLogs]'), codeInput = document.querySelector('[data-codeInput]'), codeRun = document.querySelector('[data-codeRun]'), newData = document.querySelector('[data-newdata]'), delData = document.querySelector('[data-deldata]'), newDataMenu = document.querySelector('[data-newDataMenu]'), newdataName = document.querySelector('[data-newdata-name]'), newdataCount = document.querySelector('[data-newdata-count]'), listDataList = document.querySelector('[data-list-data]'), listData = document.querySelector('[data-list-data]'), listName = document.querySelector('[data-list-name]'), listContent = document.querySelector('[data-list-content]'), notifications = document.querySelector('[data-notifications'), notificationTemplate = document.querySelector('[data-notificationTemplate]'), close_1 = document.querySelector('[data-close-1]');
var loaded = !1, cdc = !1, lists = [];
function init() {
	initDevDebug(), loadData(), debugConsoleBtn.addEventListener('click', () => {
		container.classList.toggle('blur'), debugConsole.classList.toggle('hide'), codeInput.value = '';
	}), close_1.addEventListener('click', () => {
		container.classList.toggle('blur'), listDataList.classList.toggle('hide'), listContent.classList.remove('blur'), newDataMenu.classList.add('hide'), newData.disabled = !1, delData.disabled = !1, newdataName.value = '', newdataCount.value = '', document.querySelectorAll('[data-data]').forEach(e => {
			null != e && e.remove();
		});
	}), newBtn.addEventListener('click', () => {
		container.classList.toggle('blur'), create.classList.toggle('hide'), cancel.onclick = () => {
			container.classList.toggle('blur'), create.classList.toggle('hide');
		}, submit.onclick = e => {
			e.preventDefault(), localStorage.getItem('ausgaben_data') || localStorage.setItem('ausgaben_data', btoa(JSON.stringify({ lists: [] })));
			const t = JSON.parse(atob(localStorage.getItem('ausgaben_data')));
			if (!input_name.checkValidity() || !input_desc.checkValidity())
				return createNotification('Invalid input', 'Please fill out all fields.');
			if (onlySpaces(input_name.value) || onlySpaces(input_desc.value))
				return createNotification('Invalid input', 'Please fill out all fields.');
			var a = !1;
			if (lists.forEach(e => {
					if (e.name.toLocaleLowerCase() == input_name.value.toLocaleLowerCase())
						return a = !0, console.warn('A list with this name already exists.'), createNotification('Error', `A list with the name ${ e.name } already exists.`, 5);
				}), a)
				return;
			submit.disabled = !0, cancel.disabled = !0, submit.querySelector('[data-spinner]').classList.toggle('hide');
			const o = {
				name: input_name.value,
				desc: input_desc.value,
				data: []
			};
			lists.push(o), t.lists.push(o), localStorage.setItem('ausgaben_data', btoa(JSON.stringify(t))), setTimeout(() => {
				createList(o), input_name.value = '', input_desc.value = '', submit.disabled = !1, cancel.disabled = !1, submit.querySelector('[data-spinner]').classList.toggle('hide'), container.classList.toggle('blur'), create.classList.toggle('hide'), location.reload();
			}, 1000);
		};
	}), del.addEventListener('click', () => {
		if (localStorage.getItem('ausgaben_data') || localStorage.setItem('ausgaben_data', btoa(JSON.stringify({ lists: [] }))), 0 == lists.length)
			return console.warn('No lists to delete.');
		var e = null;
		document.querySelectorAll('[data-del-item]').forEach(e => {
			e && e.remove();
		}), lists.forEach(e => {
			if (console.log(e), !e)
				return;
			const t = delTemplate.content.cloneNode(!0).children[0];
			t.querySelector('[data-del-name]').innerText = e.name, delList.appendChild(t), console.log(t);
		}), container.classList.toggle('blur'), delf.classList.toggle('hide'), canceldel.onclick = () => {
			container.classList.toggle('blur'), delf.classList.toggle('hide');
		}, submitdel.onclick = t => {
			t.preventDefault(), null != e && (submitdel.disabled = !0, canceldel.disabled = !0, submitdel.querySelector('[data-spinner]').classList.toggle('hide'), setTimeout(() => {
				deleteList(e), container.classList.toggle('blur'), delf.classList.toggle('hide'), submitdel.disabled = !1, canceldel.disabled = !1, submitdel.querySelector('[data-spinner]').classList.toggle('hide');
			}, 1000));
		}, document.querySelectorAll('[data-del-item]').forEach(t => {
			t.classList.remove('select'), t.addEventListener('click', a => {
				a.preventDefault(), document.querySelectorAll('[data-del-item]').forEach(e => {
					e.classList.remove('select');
				}), t.classList.add('select'), e = t;
			});
		});
	}), document.querySelectorAll('[data-item]').forEach(e => {
		if (null == e)
			return console.warn('element:[item] not defined');
		e.addEventListener('click', t => {
			console.log(t.target), t.target.querySelector('[data-name]') ? setLocationText(t.target.querySelector('[data-name]').innerText) : t.target.parentNode.parentNode.querySelector('[data-name]') ? setLocationText(t.target.parentNode.parentNode.querySelector('[data-name]').innerText) : console.warn('Unable to get list name.'), container.classList.toggle('blur'), listDataList.classList.toggle('hide'), loadListData(e);
		});
	});
}
function createNotification(e, t, a) {
	e = e || 'Unknown title', t = t || 'Unknown message', a = 1000 * parseInt(a) || 5000, console.warn('Notification: ' + e, ' - ', t);
	const o = notificationTemplate.content.cloneNode(!0).children[0];
	o.querySelector('[data-title]').innerText = e, o.querySelector('[data-message]').innerText = t, notifications.appendChild(o);
	var n = setTimeout(() => {
		o.classList.add('out'), o.classList.add('in'), setTimeout(() => {
			o.remove();
		}, 1000);
	}, a);
	o.querySelector('[data-close]').addEventListener('click', () => {
		clearTimeout(n), o.classList.add('out'), o.classList.add('in'), setTimeout(() => {
			o.remove();
		}, 1000);
	});
}
function loadListData(e) {
	if (null == e)
		return console.warn('attr:[item] not given');
	const t = e.querySelector('[data-name]').innerText, a = lists.findIndex(e => e.name === t);
	if (a < 0)
		return console.warn(`List index [${ a }] not found.`);
	const o = lists[a].data;
	if (o.forEach(e => {
			if (null == e)
				return;
			console.log(e);
			const t = listDataTemplate.content.cloneNode(!0).children[0], a = t.querySelector('[data-1]'), o = t.querySelector('[data-2]');
			t.querySelector('[data-3]');
			a.innerText = e.date || '---', o.innerText = e.value || '---', listContent.appendChild(t);
		}), o.length < 1) {
		const e = document.createElement('p');
		e.attributes.setNamedItem(document.createAttribute('data-data')), e.classList.add('text-center'), e.innerText = 'No data found.', listContent.appendChild(e);
	} else
		document.querySelector('[data-data]').remove();
	newData.onclick = () => {
		console.log('click'), newData.disabled = !0, delData.disabled = !0, newData.querySelector('[data-spinner]').classList.toggle('hide'), setTimeout(() => {
			newDataMenu.classList.remove('hide'), listContent.classList.toggle('blur'), newData.querySelector('[data-spinner]').classList.toggle('hide');
		}, 1000);
	};
}
function createList(e) {
	if (null == e)
		return console.warn('attr:[list] not given');
	const t = listTemplate.content.cloneNode(!0).children[0], a = t.querySelector('[data-name]'), o = t.querySelector('[data-desc]');
	a.innerText = e.name, o.innerText = e.desc, itemList.appendChild(t), console.warn(`List ${ e.name } created.`), createNotification('List created', `List ${ a } sucessfully created.`), lists.length > 0 && document.querySelector('[data-nolists]') && document.querySelector('[data-nolists]').remove();
}
function setLocationText(e) {
	if (null == e && e.toString())
		return console.warn('No valid text given to set location text.');
	console.warn(`Set location text to [${ e }]`), console.log(e), text_location.innerText = `> ${ e }`;
}
function deleteList(e) {
	if (null == e)
		return console.warn('attr:[item] not given');
	const t = e.querySelector('[data-del-name]').innerText, a = lists.findIndex(e => e.name === t), o = JSON.parse(atob(localStorage.getItem('ausgaben_data')));
	if (a < 0)
		return console.warn(`List index [${ a }] not found.`);
	deleteIndex(lists, parseInt(a)), document.querySelectorAll('[data-item]')[a].remove(), o.lists = lists, localStorage.setItem('ausgaben_data', btoa(JSON.stringify(o))), console.warn('Deleted list index [' + a + ']'), createNotification('List deleted', `List ${ t } sucessfully deleted.`);
}
function onlySpaces(e) {
	return 0 === e.trim().length;
}
function deleteIndex(e, t) {
	return null == (e || t) && console.warn('attr:[arr|index] not given'), e.splice(t, 1);
}
function loadData() {
	lists = [], document.querySelectorAll('[data-item]').forEach(e => {
		null != e && e.remove();
	}), localStorage.getItem('ausgaben_data') || localStorage.setItem('ausgaben_data', btoa(JSON.stringify({ lists: [] })));
	if (JSON.parse(atob(localStorage.getItem('ausgaben_data'))).lists.forEach(e => {
			if (!e)
				return;
			lists.push(e), console.log(e);
			const t = listTemplate.content.cloneNode(!0).children[0], a = t.querySelector('[data-name]'), o = t.querySelector('[data-desc]');
			a.innerText = e.name, o.innerText = e.desc, itemList.appendChild(t);
		}), console.warn(`Total of ${ lists.length } list(s) loaded.`), 0 == lists.length) {
		const e = document.createElement('p');
		e.attributes.setNamedItem(document.createAttribute('data-nolists')), e.classList.add('text-center'), e.innerText = 'You have not created any list yet.', itemList.appendChild(e);
	}
	loaded ? console.warn('Client data reloaded. Please reload the page!') : (loaded = !0, console.warn('Client data loaded.'));
}
function resetClientData() {
	if (cdc)
		return console.warn('Client data request already initalized.');
	console.warn("Please enter 'deleteData()' to confirm the process."), cdc = !0;
}
function deleteData() {
	cdc && (console.warn('Process confirmed. Data will reset in 5 seconds. To cancel this, refresh the page now!'), setTimeout(() => {
		localStorage.removeItem('ausgaben_data'), console.warn('Client data sucessfully reseted. Page will refresh in 2 seconds!'), setTimeout(() => location.reload(), 2000);
	}, 5000));
}
function initDevDebug() {
	function onLog(arguments, e) {
		if (null == arguments)
			return console.warn('attr:[arguments|color] not given');
		const t = debugMsgTemplate.content.cloneNode(!0).children[0];
		t.innerText = arguments[0], t.style.color = e || 'white', debugLogs.appendChild(t);
	}
	console.allLogs = [], console.defaultLog = console.log.bind(console), console.defaultWarn = console.warn.bind(console), console.defaultError = console.error.bind(console), console.defaultDebug = console.debug.bind(console), console.defaultInfo = console.info.bind(console), console.logs = [], console.warns = [], console.errors = [], console.debugs = [], console.infos = [], console.log = function () {
		console.logs.push(Array.from(arguments)), console.allLogs.push(Array.from(arguments)), console.defaultLog.apply(console, arguments), onLog(arguments, 'white');
	}, console.warn = function () {
		console.warns.push(Array.from(arguments)), console.allLogs.push(Array.from(arguments)), console.defaultWarn.apply(console, arguments), onLog(arguments, 'orange');
	}, console.error = function () {
		console.errors.push(Array.from(arguments)), console.allLogs.push(Array.from(arguments)), console.defaultError.apply(console, arguments), onLog(arguments, 'red');
	}, console.debug = function () {
		console.debugs.push(Array.from(arguments)), console.allLogs.push(Array.from(arguments)), console.defaultDebug.apply(console, arguments), onLog(arguments, 'white');
	}, console.info = function () {
		console.debugs.push(Array.from(arguments)), console.allLogs.push(Array.from(arguments)), console.defaultInfo.apply(console, arguments), onLog(arguments, 'lightskyblue');
	}, codeRun.addEventListener('click', e => {
		if (!onlySpaces(codeInput.value) || null != codeInput.value) {
			try {
				eval(codeInput.value);
			} catch (e) {
				console.error(e);
			}
			codeInput.value = '';
		}
	});
}
window.onload = () => {
	init();
};
