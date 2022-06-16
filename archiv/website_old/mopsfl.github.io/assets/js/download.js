var files = [{
    ID: "test",
    FileName: "Test",
    FileURL: "https://raw.githubusercontent.com/mopsfl/mopsfl.github.io/main/assets/files/download/Test.txt"
}, {
    ID: "796b455b70756c38682f49572565222477624a595d463a2a3c356a51362e",
    FileName: "Gamepass Interface",
    FileURL: "https://github.com/mopsfl/mopsfl.github.io/raw/main/assets/files/download/GamepassInterface.zip"
}, {
    ID: "7032385672394a476f7d7823772922465d5860216e41424b48302f2d3775",
    FileName: "Test",
    FileURL: "https://raw.githubusercontent.com/mopsfl/mopsfl.github.io/main/assets/files/download/Test.txt"
}, ];

var download = document.getElementById("download"),
    fileName = document.getElementById("file-name"),
    lastPage = document.referrer


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

function downloadFile(FileURL) {
    if (FileURL !== undefined && FileURL !== null) {
        try {
            var popUp = window.open(FileURL)
            if (!popUp || popUp.closed || typeof popUp.closed == 'undefined') {
                return false
            }
        } catch (e) {
            console.warn(e)
        }
    } else {
        fileName.innerHTML = "File not found"
        return console.warn("File not found")
    }
}

function main() {
    if (window.location.search != "") {
        if (params["id"] != undefined && params["id"]) {
            setTimeout(() => {
                for (let i = 0; i < files.length; i++) {
                    const File = files[i];
                    //if (params["id"] == File.ID) {
                    if (File !== undefined && File !== null) {
                        if (params["id"] == File.ID) {
                            var downloadFunc = downloadFile(File.FileURL)
                            if (downloadFunc !== false) {
                                fileName.innerHTML = File.FileName
                                console.log("Downloaded" + File.FileName)
                                setTimeout(() => {
                                    if (lastPage !== "") {
                                        return location = document.referrer
                                    } else {
                                        return location = "../"
                                    }
                                }, 0)
                            } else {
                                fileName.innerHTML = File.FileName
                                download.href = File.FileURL
                                download.classList.add("visible")
                                download.classList.remove("hidden")
                                return console.warn("Popup is blocked")
                            }
                        }
                    } else {
                        fileName.innerHTML = "File not found"
                        console.warn("file not found")
                        if (lastPage !== "") {
                            return location = document.referrer
                        } else {
                            return location = "../"
                        }
                    }
                    /*} else {
                        fileName.innerHTML = "File not found"
                        console.warn("file not found")
                        if (lastPage !== "") {
                            return location = document.referrer
                        } else {
                            return location = "../"
                        }
                    }*/
                }
            }, 300)
        } else {
            console.warn("Invalid download format")
            if (lastPage !== "") {
                return location = document.referrer
            } else {
                return location = "../"
            }
        }
    } else {
        console.warn("Invalid download format")
        if (lastPage !== "") {
            return location = document.referrer
        } else {
            return location = "../"
        }
    }
}


window.addEventListener('load', main);