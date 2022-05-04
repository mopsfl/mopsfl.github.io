const apiKey = "ndWVoh3UCxmayEjeIRHVXF2Zt1Ca5IUMGZWSrtEZvdkQ5NVY6lUQ"
const channelID = "UCtJTqwX2h8MiuFWd6dsyzbw"
const statistics = new Request(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${atob(apiKey.split("").reverse().join(""))}`)
const snippet = new Request(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelID}&key=${atob(apiKey.split("").reverse().join(""))}`)
const streams = new Request(`https://www.googleapis.com/youtube/v3/search?type=video&eventType=live&part=snippet&channelId=${channelID}&key=${atob(apiKey.split("").reverse().join(""))}`)
const debug = false

let $_ = true
let channelName = ""

const messages = {
    ["1mil"]: `🎉 CSYON hat 100.000.000 Abbonenten erreicht. 🎉`,
    ["live"]: `🔴 CSYON ist live! 🔴`,
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

function fetchAll(a) {
    function fetchStatistics() {
        fetch(statistics)
            .then(res => res.json())
            .then(data => {
                const statistics = data.items[0].statistics
                if (debug) console.log(data)
                $(".subCount").text("Subscriber: " + statistics.subscriberCount)
                $(".viewCount").text("Views: " + statistics.viewCount)
                $(".vidCount").text("Videos: " + statistics.videoCount)
                $("._ld").hide()
                $(".news").hide()
                $("._l").hide()
                $(".section-main").show()
                if (statistics.subscriberCount >= 1000000 && !(statistics.subscriberCount > 1000000)) {
                    $(".news").text(messages["1mil"])
                    $(".news").show()
                }
            })
            .catch(err => {
                $("._ld").hide()
                $("._l").show()
                $(".section-main").hide()
                console.error(err)
            })
    }

    function fetchSnippet() {
        fetch(snippet)
            .then(res => res.json())
            .then(data => {
                const snippet = data.items[0].snippet
                channelName = snippet.title
                if (debug) console.log(data)
                $(".channelThumbnail").attr("src", snippet.thumbnails.high.url)
                $(".channelName").text(snippet.title)
            })
            .catch(err => {
                $("._ld").hide()
                $("._l").show()
                $(".section-main").hide()
                console.error(err)
            })
    }

    function fetchLivestreams() {
        fetch(streams)
            .then(res => res.json())
            .then(data => {
                    if (debug) console.log(data)
                    if (data.items.length > 0) {
                        if (debug) console.log(data.items)
                        $(".livestream").show()
                        $(".livestreamLink").attr("href", "https://www.youtube.com/watch?v=" + data.items[0].id.videoId)
                        $(".livestreamTitle").text(`Livestream: ${htmlDecode(`${data.items[0].snippet.title}`)}`)
                        $(".livestreamThumbnail").attr("src", data.items[0].snippet.thumbnails.high.url)
                        $(".news").text(messages["live"])
                        $(".news").show()
                        
                        /*if(data.items[1]){
                            $(".livestream2").show()
                            $(".livestreamLink2").attr("href", "https://www.youtube.com/watch?v=" + data.items[1].id.videoId)
                            $(".livestreamTitle2").text(`Livestream: ${htmlDecode(`${data.items[1].snippet.title}`)}`)
                            $(".livestreamThumbnail2").attr("src", data.items[1].snippet.thumbnails.high.url)
                        }*/
                } else console.warn("CSYON not live")
            })
            .catch(err => {
                $("._ld").hide()
                $("._l").show()
                $(".section-main").hide()
                console.error(err)
            })
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (a === true) {
        $(".fa-refresh").toggleClass("fa-spin")
        setTimeout(() => { $(".fa-refresh").toggleClass("fa-spin") }, 1000)
    }
    const time = Date.now()
    if ($_) {
        if ((time - $_ < 50000)) return console.warn("Fetching too fast")
    }
    console.warn("Fetched at " + time)
    $("._ld").show()
    $(".section-main").hide()
    fetchStatistics()
    fetchSnippet()
    fetchLivestreams()
    $_ = time
}

function init() {
    $("._ld").show()
    setTimeout(fetchAll, 500)

    $(".title").click(() => {
        window.open("https://www.youtube.com/channel/UCtJTqwX2h8MiuFWd6dsyzbw", "_blank")
    })

    $(".csyon-refresh").click(() => {
        fetchAll(true)
    })

    /*PARTICLE.JS*/
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 30,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 100,
                    "line_linked": {
                        "opacity": .8,
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 150,
                    "duration": 0.1
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
