var video = document.getElementById('vid');
var a1 = document.getElementById('1'),
    a2 = document.getElementById('2'),
    a3 = document.getElementById('3'),
    a4 = document.getElementById('4'),
    a5 = document.getElementById('5')

function play(video) {
    var promise = video.play();

    if (promise !== undefined) {
        promise.then(_ => {
            console.warn("Video started")
        }).catch(error => {
            console.warn("Video blocked. " + error)
        });
    }
}

document.getElementById("next").addEventListener('click', (event) => {
    if (a1.value && a2.value && a3.value && a4.value && a5.value !== "") {
        location.hash = "#top"
        location.hash = ""
        document.getElementById('container').style = "transform: translateX(200%)"
        setTimeout(() => {
            document.getElementById('container').style = "display:none"
            setTimeout(() => {
                document.getElementById('problem').style = "display:block"
                setTimeout(() => {
                    document.getElementById('vid').style = "display:block"
                    document.getElementById('lol').style = "display:block"
                    play(video)

                }, 5000)
            }, 1000);
        }, 500);
    }
})