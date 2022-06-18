const links = document.querySelectorAll('.link');
var _cgb = false
var currentProjectsFetch, currentAboutFetch

const headers = new Headers()
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');

function init() {
    for (let l = 0; l < links.length; l++) {
        const e = links[l];
        e.onmouseover = () => {
            e.lastChild.style.maxWidth = '100px';
        }, e.onmouseleave = () => {
            e.lastChild.style.maxWidth = '0px';
        };
    }

    /*PAGE LOADING*/

    /**
     * 
     * @param {string} s Section to show selector 
     * @param {string} e Section to hide selector
     * @param {string} a Section content href
     */

     function toggleSection(s, e, a) {
        '.section2' == s ? ($(s).empty(), $(s).load(a), $('.back').removeClass('hide'), _cgb = !0) : (_cgb = !1, $('.back').addClass('hide')), $(e).addClass('hide'), $(e).removeClass('show'), $(s).addClass('hide'), $(s).removeClass('show'), setTimeout(() => {
            $(e).addClass('none'), $(s).removeClass('none'), setTimeout(() => {
                $(s).removeClass('hide'), $(s).addClass('show');
            }, 500);
        }, 500);
    }

    function openLink(n) {
        if ('' != n)
            return window.open(n, '_blank');
    }

    function checkProjectLinks(e, o, t, c) {
        '' == c.downloadURL && e.remove(), '' == c.testURL && o.remove(), '' == c.githubURL && t.remove();
    }

    $(() => {
        $('.btns > a').click(e => {
            if (e.preventDefault(), !0 !== _cgb)
                if (e.target.attributes.hrefdata) {
                    const t = e.target.attributes.hrefdata.nodeValue;
                    toggleSection('.section2', '.section', t), setTimeout(() => {
                        'projects' == t ? (console.warn('Fetching projects'), fetch('./static/json/projects.json', {
                            method: 'GET',
                            headers: headers
                        }).then(e => e.json()).then(e => {
                            currentProjectsFetch = e;
                            const t = document.querySelector('[data-project-template]'), o = document.querySelector('[data-project-list]');
                            console.log(e), e.projects.forEach(e => {
                                const c = t.content.cloneNode(!0).children[0], n = c.querySelector('[data-desc-item]'), r = c.querySelector('[data-title]'), a = c.querySelector('[data-image]'), s = c.querySelector('[data-descs]'), i = c.querySelector('[data-download]'), l = c.querySelector('[data-test]'), d = c.querySelector('[data-github]');
                                r.innerText = e.title, a.src = atob(e.imageURL), i.setAttribute('href', e.downloadURL || '#'), d.setAttribute('href', e.githubURL || '#'), l.setAttribute('href', e.testURL || '#'), i.onclick = () => {
                                    openLink(e.downloadURL);
                                }, d.onclick = () => {
                                    openLink(e.githubURL);
                                }, l.onclick = () => {
                                    openLink(e.testURL);
                                }, checkProjectLinks(i, l, d, e), e.descItems.forEach(e => {
                                    const t = n.content.cloneNode(!0).children[0];
                                    t.innerHTML = e.text, s.appendChild(t);
                                }), o.appendChild(c);
                            });
                        })) : 'about' == t && fetch('./static/json/about.json', {
                            method: 'GET',
                            headers: headers
                        }).then(e => e.json()).then(e => {
                            currentAboutFetch = e;
                        });
                    }, 1000);
                } else
                    console.warn('Unable to get pageHref', e);
        }), $('.back').click(e => {
            e.preventDefault(), _cgb && toggleSection('.section', '.section2');
        });
    });

    /*SCROLL HANDLER*/

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll > 0) {
            $(".content-header").fadeOut("hide");
            $(".footer").fadeOut("hide");
        } else {
            $(".content-header").fadeIn("hide");
            $(".footer").fadeIn("hide");
        }
    });

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
                    "enable": false,
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
