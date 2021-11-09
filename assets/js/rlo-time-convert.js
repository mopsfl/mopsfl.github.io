var currentResult;
var currentMethod;

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
        }
        currentResult = result
        resultText.innerHTML = "Results: " + result + " Minute(n) <br><p style='font-size:11px'>(1 Monat ist eine Minute ;D)</p>"
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

    a.innerHTML = "Gerundet!"
    setTimeout(() => {
        a.innerHTML = oldText
    }, 1000);
}

function copyResult(a) {
    oldText = a.innerHTML
    if (getCurrentResult() != null) {
        navigator.clipboard.writeText(getCurrentResult())
        a.innerHTML = "Kopiert!"
        setTimeout(() => {
            a.innerHTML = oldText
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
        var url = window.location.origin + window.location.pathname + "?m=" + months + "&k=" + method
        navigator.clipboard.writeText(url)
        a.innerHTML = "Kopiert!"
        setTimeout(() => {
            a.innerHTML = oldText
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


    if (params["m"] != undefined && params["k"] != "") {
        console.log("share link detected.")
        if (params["k"] != undefined && params["m"] != undefined) {
            if (params["k"] == "min") {
                document.getElementById('months').value = params["m"]
                toMinutes(document.getElementById('months'), false, 2)
            } else if (params["k"] == "hour") {
                document.getElementById('months').value = params["m"]
                toHours(document.getElementById('months'), false, 2)
            } else if (params["k"] == "day") {
                document.getElementById('months').value = params["m"]
                toDays(document.getElementById('months'), false, 2)
            } else {
                console.warn("invalid convert method")
            }
        } else {
            console.warn("invalid format")
        }
    }
}
