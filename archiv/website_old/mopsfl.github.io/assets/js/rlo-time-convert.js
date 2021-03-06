var currentResult,
    currentMethod,
    rounded = false

function toMinutes(a, r) {
    value = a.value
    input = a
    currentMethod = "min"
    var result
    if (value != null && value != "" && !isNaN(value)) {
        var resultText = document.getElementById("result")
        if (r) {
            result = Math.round(value / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2) // idk why i do this
            currentResult = Math.round(value / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2)
        } else {
            result = value / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2
            currentResult = value / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2 / 2 * 2
            rounded = false
        }
        currentResult = result
        resultText.innerHTML = "Results: " + result + " Minute(n)"
        console.log(value + " months to minutes")
    } else {
        console.warn("Invalid input")
    }
}

function toHours(a, r, d) {
    value = a.value
    input = a
    currentMethod = "hour"
    var result
    if (value != null && value != "" && !isNaN(value)) {
        var resultText = document.getElementById("result")
        var result = value / 60
        if (r) {
            result = Math.round(value / 60)
            currentResult = Math.round(value / 60)
        } else {
            result = value / 60
            currentResult = value / 60
            rounded = false
        }
        resultText.innerHTML = "Results: " + result.toFixed(d) + " Stunde(n)"
        console.log(value + " months to hours")
    } else {
        console.warn("Invalid input")
    }
}

function toDays(a, r, d) {
    value = a.value
    input = a
    currentMethod = "day"
    var result
    if (value != null && value != "" && !isNaN(value)) {
        var resultText = document.getElementById("result")
        if (r) {
            result = Math.round(value / 1440)
            currentResult = Math.round(value / 1440)
        } else {
            result = value / 1440
            currentResult = value / 1440
            rounded = false
        }
        currentResult = result
        resultText.innerHTML = "Results: " + result.toFixed(d) + " Tag(e)"
        console.log(value + " months to days")
    } else {
        console.warn("Invalid input")
    }
}

function roundResult(a) {
    oldText = a.innerHTML
    var value = document.getElementById("months")
    if (getCurrentMethod() == "min") {
        toMinutes(value, true, 0)
    } else if (getCurrentMethod() == "hour") {
        toHours(value, true, 0)
    } else if (getCurrentMethod() == "day") {
        toDays(value, true, 0)
    } else {
        return console.warn("cannot round")
    }
    rounded = true
    a.innerHTML = "Gerundet!"
    setTimeout(() => {
        a.innerHTML = "Ergebniss runden"
    }, 1000);
}

function copyResult(a) {
    oldText = a.innerHTML
    if (getCurrentResult() != null) {
        navigator.clipboard.writeText(getCurrentResult())
        a.innerHTML = "Kopiert!"
        setTimeout(() => {
            a.innerHTML = "Ergebniss kopieren"
        }, 1000);
    } else {
        console.warn("cannot copy result")
    }
}

function shareResult(a) {
    oldText = a.innerHTML
    if (getCurrentResult() != null && getCurrentMethod() != null) {
        var months = document.getElementById("months").value
        var method = getCurrentMethod()
        var url = window.location.origin + window.location.pathname + "?m=" + months + "&k=" + method + "&r=" + rounded
        navigator.clipboard.writeText(url)
        a.innerHTML = "Kopiert!"
        setTimeout(() => {
            a.innerHTML = "Share"
        }, 1000);
    } else {
        console.warn("cannot create share link")
    }
}

function getCurrentResult() {
    if (currentResult != null && currentResult != "" && currentResult != undefined) {
        return currentResult
    } else {
        return null
    }
}

function getCurrentMethod() {
    if (currentMethod != null && currentMethod != "" && currentMethod != undefined) {
        return currentMethod
    } else {
        return null
    }
}

if (window.location.search != "") {
    var parseQueryString = function() {

        var str = window.location.search;
        var objURL = {};

        str.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) {
                objURL[$1] = $3;
            }
        );
        return objURL;
    };
    var params = parseQueryString();


    if (params["m"] != undefined && params["k"] != "" && params["r"] != "") {
        console.log("share link detected.")
        if (params["k"] != undefined && params["m"] != undefined && params["r"] != undefined && params["r"] == "false" || "true") {
            var r = false
            if (params["k"] == "min") {
                if (params["r"] == "true") {
                    r = true
                }
                document.getElementById('months').value = params["m"]
                toMinutes(document.getElementById('months'), r, 2)
            } else if (params["k"] == "hour") {
                if (params["r"] == "true") {
                    r = true
                }
                document.getElementById('months').value = params["m"]
                toHours(document.getElementById('months'), r, 2)
            } else if (params["k"] == "day") {
                if (params["r"] == "true") {
                    r = true
                }
                document.getElementById('months').value = params["m"]
                toDays(document.getElementById('months'), r, 2)
            } else {
                console.warn("invalid convert method")
            }
            r = false
        } else {
            console.warn("invalid format")
        }
    }
}