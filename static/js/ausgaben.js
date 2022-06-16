const newBtn = document.querySelector("[data-new]"),
    itemList = document.querySelector("[data-list]"),
    delList = document.querySelector("[data-del-list]"),
    listTemplate = document.querySelector("[data-list-template]"),
    delTemplate = document.querySelector("[data-template-del]"),
    debugMsgTemplate = document.querySelector("[data-debugMsgTemplate]"),
    listDataTemplate = document.querySelector("[data-list-data-template]"),
    container = document.querySelector("[data-container]"),
    create = document.querySelector("[data-create]"),
    delf = document.querySelector("[data-delf]"),
    del = document.querySelector("[data-delete]"),
    form = document.querySelector("[data-form]"),
    input_name = document.querySelector("[data-form-name]"),
    input_desc = document.querySelector("[data-form-desc]"),
    input_color = document.querySelector("[data-form-color]"),
    cancel = document.querySelector("[data-cancel]"),
    canceldel = document.querySelector("[data-canceldel]"),
    submit = document.querySelector("[data-submit]"),
    submitdel = document.querySelector("[data-submitdel]"),
    text_location = document.querySelector("[data-location]"),
    debugConsoleBtn = document.querySelector("[data-debugConsoleBtn]"),
    debugConsole = document.querySelector("[data-debugConsole]"),
    debugLogs = document.querySelector("[data-debugLogs]"),
    codeInput = document.querySelector("[data-codeInput]"),
    codeRun = document.querySelector("[data-codeRun]"),
    newData = document.querySelector("[data-newdata]"),
    delData = document.querySelector("[data-deldata]"),
    newDataMenu = document.querySelector("[data-newDataMenu]"),
    newdataName = document.querySelector("[data-newdata-name]"),
    newdataCount = document.querySelector("[data-newdata-count]"),
    listDataList = document.querySelector("[data-list-data]"),
    listData = document.querySelector("[data-list-data]"),
    listName = document.querySelector("[data-list-name]"),
    listContent = document.querySelector("[data-list-content]"),
    notifications = document.querySelector("[data-notifications"),
    notificationTemplate = document.querySelector("[data-notificationTemplate]"),
    close_1 = document.querySelector("[data-close-1]");

var loaded = false,
    cdc = false,
    lists = []


window.onload = () => {
    init()
}

/*FUNCTION*/

/**
 * Initalizes the system
 */

function init() {
    initDevDebug()
    loadData()

    debugConsoleBtn.addEventListener("click", () => {
        container.classList.toggle("blur")
        debugConsole.classList.toggle("hide")
        codeInput.value = ""
    })

    close_1.addEventListener("click", () => {
        container.classList.toggle("blur")
        listDataList.classList.toggle("hide")
        listContent.classList.remove("blur")
        newDataMenu.classList.add("hide")
        newData.disabled = false
        delData.disabled = false
        newdataName.value = ""
        newdataCount.value = ""

        document.querySelectorAll("[data-data]").forEach(element => {
            if (element == null) return
            element.remove()
        })
    })

    newBtn.addEventListener("click", () => {
        container.classList.toggle("blur")
        create.classList.toggle("hide")

        cancel.onclick = () => {
            container.classList.toggle("blur")
            create.classList.toggle("hide")
        }

        submit.onclick = (e) => {
            e.preventDefault()
            if (!localStorage.getItem("ausgaben_data")) localStorage.setItem("ausgaben_data", btoa(JSON.stringify({ lists: [], })))
            const data = JSON.parse(atob(localStorage.getItem("ausgaben_data")))

            if (!(input_name.checkValidity() && input_desc.checkValidity())) return createNotification("Invalid input", "Please fill out all fields.")
            if (onlySpaces(input_name.value) || onlySpaces(input_desc.value)) return createNotification("Invalid input", "Please fill out all fields.")
            var x = false

            lists.forEach(list => {
                if (list.name.toLocaleLowerCase() == input_name.value.toLocaleLowerCase()) {
                    x = true
                    console.warn("A list with this name already exists.")
                    return createNotification("Error", `A list with the name ${list.name} already exists.`, 5)
                }
            })

            if (x) return

            submit.disabled = true
            cancel.disabled = true
            submit.querySelector("[data-spinner]").classList.toggle("hide")

            const list = {
                name: input_name.value,
                desc: input_desc.value,
                //color: input_color.value,
                data: [],
            }

            lists.push(list)
            data.lists.push(list)

            localStorage.setItem("ausgaben_data", btoa(JSON.stringify(data)))

            setTimeout(() => {
                createList(list)
                input_name.value = ""
                input_desc.value = ""
                submit.disabled = false
                cancel.disabled = false
                submit.querySelector("[data-spinner]").classList.toggle("hide")

                container.classList.toggle("blur")
                create.classList.toggle("hide")

                location.reload()
            }, 1000)
        }
    })

    del.addEventListener("click", () => {
        if (!localStorage.getItem("ausgaben_data")) localStorage.setItem("ausgaben_data", btoa(JSON.stringify({ lists: [], })))
        if (lists.length == 0) return console.warn("No lists to delete.")

        var selectedList = null

        document.querySelectorAll("[data-del-item]").forEach(item => {
            if (!item) return
            item.remove()
        })

        lists.forEach(list => {
            console.log(list)
            if (!list) return
            const item = delTemplate.content.cloneNode(true).children[0]
            item.querySelector("[data-del-name]").innerText = list.name

            delList.appendChild(item)
            console.log(item)
        })

        container.classList.toggle("blur")
        delf.classList.toggle("hide")

        canceldel.onclick = () => {
            container.classList.toggle("blur")
            delf.classList.toggle("hide")
        }

        submitdel.onclick = (e) => {
            e.preventDefault()
            if (selectedList == null) return
            submitdel.disabled = true
            canceldel.disabled = true
            submitdel.querySelector("[data-spinner]").classList.toggle("hide")

            setTimeout(() => {
                deleteList(selectedList)

                container.classList.toggle("blur")
                delf.classList.toggle("hide")
                submitdel.disabled = false
                canceldel.disabled = false
                submitdel.querySelector("[data-spinner]").classList.toggle("hide")
            }, 1000)
        }

        document.querySelectorAll("[data-del-item]").forEach(item => {
            item.classList.remove("select")
            item.addEventListener("click", (e) => {
                e.preventDefault()
                document.querySelectorAll("[data-del-item]").forEach(item => {
                    item.classList.remove("select")
                })
                item.classList.add("select")
                selectedList = item
            })
        })
    })

    document.querySelectorAll("[data-item]").forEach(item => {
        if (item == null) return console.warn("element:[item] not defined")
        item.addEventListener("click", (e) => {
            console.log(e.target)
            if (e.target.querySelector("[data-name]")) {
                setLocationText(e.target.querySelector("[data-name]").innerText)
            } else if (e.target.parentNode.parentNode.querySelector("[data-name]")) {
                setLocationText(e.target.parentNode.parentNode.querySelector("[data-name]").innerText)
            } else console.warn("Unable to get list name.")

            container.classList.toggle("blur")
            listDataList.classList.toggle("hide")
            loadListData(item)
        })
    })

}

/**
 * Creates a new notification and displays it on the client screen
 * @param {String} title The notification Title
 * @param {String} message The notification message
 * @param {Number} length How long the notification should show in seconds
 */

function createNotification(title, message, length) {
    title = title || "Unknown title"
    message = message || "Unknown message"
    length = (parseInt(length) * 1000) || 5000
    console.warn("Notification: " + title, " - ", message)

    const notif = notificationTemplate.content.cloneNode(true).children[0]
    notif.querySelector("[data-title]").innerText = title
    notif.querySelector("[data-message]").innerText = message

    notifications.appendChild(notif)

    var ntm = setTimeout(() => {
        notif.classList.add("out")
        notif.classList.add("in")

        setTimeout(() => { notif.remove() }, 1000)
    }, length)

    notif.querySelector("[data-close]").addEventListener("click", () => {
        clearTimeout(ntm)
        notif.classList.add("out")
        notif.classList.add("in")

        setTimeout(() => { notif.remove() }, 1000)
    })
}

/**
 * Loads/sets the data of the given list
 * @param {HTMLElement} list 
 * @returns {Array}
 */

function loadListData(item) {
    if (item == null) return console.warn("attr:[item] not given")
    const name = item.querySelector("[data-name]").innerText
    const index = lists.findIndex(x => x.name === name)

    if (index < 0) return console.warn(`List index [${index}] not found.`)

    const listData = lists[index].data

    //document.querySelectorAll("[data-data]").forEach(element => {
    //    if (element == null) return
    //    element.remove()
    //})

    listData.forEach(data => {
        if (data == null) return
        console.log(data)

        const citem = listDataTemplate.content.cloneNode(true).children[0]
        const v1 = citem.querySelector("[data-1]")
        const v2 = citem.querySelector("[data-2]")
        const v3 = citem.querySelector("[data-3]")

        v1.innerText = data.date || "---"
        v2.innerText = data.value || "---"

        listContent.appendChild(citem)
    })

    if (listData.length < 1) {
        const text = document.createElement("p")
        text.attributes.setNamedItem(document.createAttribute("data-data"))
        text.classList.add("text-center")
        text.innerText = "No data found."
        listContent.appendChild(text)
    } else document.querySelector("[data-data]").remove()

    newData.onclick = () => {
        console.log("click")
        newData.disabled = true
        delData.disabled = true
        newData.querySelector("[data-spinner]").classList.toggle("hide")

        setTimeout(() => {
            newDataMenu.classList.remove("hide")
            listContent.classList.toggle("blur")
            newData.querySelector("[data-spinner]").classList.toggle("hide")
        }, 1000)
    }
}

/**
 * Creates a new list
 * @param {Object} list List object info ( { name: x, desc: x, } ) 
 * @returns 
 */

function createList(list) {
    if (list == null) return console.warn("attr:[list] not given")
    const item = listTemplate.content.cloneNode(true).children[0]
    const name = item.querySelector("[data-name]")
    const desc = item.querySelector("[data-desc]")

    name.innerText = list.name
    desc.innerText = list.desc

    itemList.appendChild(item)

    console.warn(`List ${list.name} created.`)
    createNotification("List created", `List ${name} sucessfully created.`)

    if (lists.length > 0) {
        if (document.querySelector("[data-nolists]")) document.querySelector("[data-nolists]").remove()
    }
}

/**
 * Sets the location text next to the page title element
 * @param {String} text The text you want to display 
 * @returns 
 */

function setLocationText(text) {
    if (text == null && text.toString()) return console.warn("No valid text given to set location text.")
    console.warn(`Set location text to [${text}]`)
    console.log(text)
    text_location.innerText = `> ${text}`
}

/**
 * Deletes a specified list 
 * @param {HTMLElement} list The selected list element from the delete menu
 * @returns 
 */

function deleteList(list) {
    if (list == null) return console.warn("attr:[item] not given")
    const name = list.querySelector("[data-del-name]").innerText
    const index = lists.findIndex(x => x.name === name)
    const data = JSON.parse(atob(localStorage.getItem("ausgaben_data")))

    if (index < 0) return console.warn(`List index [${index}] not found.`)

    deleteIndex(lists, parseInt(index))
    document.querySelectorAll("[data-item]")[index].remove()
    data.lists = lists
    localStorage.setItem("ausgaben_data", btoa(JSON.stringify(data)))
    console.warn("Deleted list index [" + index + "]")
    createNotification("List deleted", `List ${name} sucessfully deleted.`)
}

function onlySpaces(str) {
    return str.trim().length === 0;
}

/**
 * Deletes an specified index from an array
 * @param {Array} arr The array where you want to remove an index 
 * @param {Number} index The index to remove from the array
 * @returns
 */

function deleteIndex(arr, index) {
    if ((arr || index) == null) console.warn("attr:[arr|index] not given")
    return arr.splice(index, 1)
}

function loadData() {
    //if (loaded) return console.warn("Client data already loaded.")
    lists = []
    document.querySelectorAll("[data-item]").forEach(item => {
        if (item == null) return
        item.remove()
    })
    if (!localStorage.getItem("ausgaben_data")) localStorage.setItem("ausgaben_data", btoa(JSON.stringify({ lists: [], })))
    const data = JSON.parse(atob(localStorage.getItem("ausgaben_data")))
    data.lists.forEach(list => {
        if (!list) return
        lists.push(list)
        console.log(list)
        const item = listTemplate.content.cloneNode(true).children[0]
        const name = item.querySelector("[data-name]")
        const desc = item.querySelector("[data-desc]")

        name.innerText = list.name
        desc.innerText = list.desc

        itemList.appendChild(item)
    })

    console.warn(`Total of ${lists.length} list(s) loaded.`)

    if (lists.length == 0) {
        const text = document.createElement("p")
        text.attributes.setNamedItem(document.createAttribute("data-nolists"))
        text.classList.add("text-center")
        text.innerText = "You have not created any list yet."
        itemList.appendChild(text)
    }

    if (!loaded) {
        loaded = true
        console.warn("Client data loaded.")
    } else console.warn("Client data reloaded. Please reload the page!")
}

function resetClientData() {
    if (cdc) return console.warn("Client data request already initalized.")
    console.warn("Please enter 'deleteData()' to confirm the process.")
    cdc = true
}

function deleteData() {
    if (!cdc) return
    console.warn("Process confirmed. Data will reset in 5 seconds. To cancel this, refresh the page now!")

    setTimeout(() => {
        localStorage.removeItem("ausgaben_data")
        console.warn("Client data sucessfully reseted. Page will refresh in 2 seconds!")

        setTimeout(() => {
            return location.reload()
        }, 2000)
    }, 5000)
}

function initDevDebug() {
    console.allLogs = []

    console.defaultLog = console.log.bind(console)
    console.defaultWarn = console.warn.bind(console)
    console.defaultError = console.error.bind(console)
    console.defaultDebug = console.debug.bind(console)
    console.defaultInfo = console.info.bind(console)

    console.logs = [];
    console.warns = [];
    console.errors = [];
    console.debugs = [];
    console.infos = [];

    console.log = function() {
        console.logs.push(Array.from(arguments));
        console.allLogs.push(Array.from(arguments));
        console.defaultLog.apply(console, arguments)
        onLog(arguments, "white")
    }

    console.warn = function() {
        console.warns.push(Array.from(arguments));
        console.allLogs.push(Array.from(arguments));
        console.defaultWarn.apply(console, arguments)
        onLog(arguments, "orange")
    }

    console.error = function() {
        console.errors.push(Array.from(arguments));
        console.allLogs.push(Array.from(arguments));
        console.defaultError.apply(console, arguments)
        onLog(arguments, "red")
    }

    console.debug = function() {
        console.debugs.push(Array.from(arguments));
        console.allLogs.push(Array.from(arguments));
        console.defaultDebug.apply(console, arguments)
        onLog(arguments, "white")
    }

    console.info = function() {
        console.debugs.push(Array.from(arguments));
        console.allLogs.push(Array.from(arguments));
        console.defaultInfo.apply(console, arguments)
        onLog(arguments, "lightskyblue")
    }

    codeRun.addEventListener("click", (e) => {
        if (onlySpaces(codeInput.value) && codeInput.value == null) return
        try {
            eval(codeInput.value)
        } catch (error) {
            console.error(error)
        }
        codeInput.value = ""
    })


    function onLog(arguments, color) {
        if (arguments == null) return console.warn("attr:[arguments|color] not given")

        const item = debugMsgTemplate.content.cloneNode(true).children[0]
        item.innerText = arguments[0]
        item.style.color = color || "white"

        debugLogs.appendChild(item)
    }
}