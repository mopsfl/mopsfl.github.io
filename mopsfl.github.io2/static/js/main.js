const links = document.querySelectorAll('.link');
var _cgb = false

function init() {
    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        console.log(element)
        element.onmouseover = () => {
            element.lastChild.style.maxWidth = '100px';
        }
        element.onmouseleave = () => {
            element.lastChild.style.maxWidth = '0px';
        }
    }

    /*PARTICLE.JS*/
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 50,
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
                "distance": 150,
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
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 100,
                    "line_linked": {
                        "opacity": 1,
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
                    "distance": 200,
                    "duration": 0.4
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

    /*PAGE LOADING*/

    $(() => {
        $(".btns > a").click((e) => {
            e.preventDefault();
            $(".section").toggleClass("hide");
            $(".section2").toggleClass("hide");
            $(".section2").load(e.target.href);
            setTimeout(() => {
                $(".section").toggleClass("none");
                $(".section2").removeClass("none");
            }, 500)
            setTimeout(() => {
                $(".section2").toggleClass("show");
            }, 500)
        });

        $(".back").click((e) => {
            e.preventDefault();
            $(".section").addClass("hide");
            $(".section2").addClass("hide");
            $(".section2").removeClass("show");
            $(".section").removeClass("none");
            setTimeout(() => {
                $(".section2").addClass("none");
                setTimeout(() => {
                    $(".section").addClass("show");
                    $(".section").removeClass("hide");
                }, 500)
            }, 500)
        })
    });
}