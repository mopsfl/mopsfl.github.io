import * as _ from "lodash"
import $ from "jquery"

const links = document.querySelectorAll('.link');
var _cgb = false,
    currentProjectsFetch, currentAboutFetch

const headers = new Headers()
headers.append('pragma', 'no-cache');
headers.append('cache-control', 'no-cache');

for (let i = 0; i < links.length; i++) {
    const element = links[i];
    element.addEventListener("mouseover", () => {
        const icon_text: any = element.querySelector("#icon-text")
        icon_text.style.maxWidth = '100px';
    })
    element.addEventListener("mouseleave", () => {
        const icon_text: any = element.querySelector("#icon-text")
        icon_text.style.maxWidth = '0px';
    })
}

/*PAGE LOADING*/

/**
 * @param {string} stss Section to show selector 
 * @param {string} sths Section to hide selector
 * @param {string} sch Section content href
 */

function toggleSection(stss?: string, sths?: string, sch?: string) {
    if (stss == ".section2") {
        $(stss).empty()
        $(stss).load(sch)
        $(".back").removeClass("hide")
        _cgb = true
    } else {
        _cgb = false
        $(".back").addClass("hide")
    }

    $(sths).addClass("hide")
    $(sths).removeClass("show")
    $(stss).addClass("hide");
    $(stss).removeClass("show")
    setTimeout(() => {
        $(sths).addClass("none")
        $(stss).removeClass("none")
        setTimeout(() => {
            $(stss).removeClass("hide");
            $(stss).addClass("show");
        }, 500)
    }, 500)
}

function openLink(link) {
    if (!_.isNil(link)) {
        return window.open(link, '_blank')
    }
}

function checkProjectLinks(a, b, c, d) {
    if (!d.downloadURL) {
        a.remove()
    }
    if (!d.testURL) {
        b.remove()
    }
    if (!d.githubURL) {
        c.remove()
    }
}

$(() => {
    $(".btns > a").on("click", (e) => {
        e.preventDefault();
        if (_cgb === true) return
        if (!_.isNil(e.target.attributes["hrefdata"])) {
            const hrefData = e.target.attributes["hrefdata"].nodeValue
            toggleSection(".section2", ".section", `/static/pages/${hrefData}.html`)
            setTimeout(async () => {
                if (hrefData == "projects") {
                    console.warn("Fetching projects")
                    await fetch("./static/json/projects.json", { method: 'GET', headers: headers })
                        .then(res => res.json())
                        .then(data => {
                            currentProjectsFetch = data
                            const projectTemplate: any = document.querySelector("[data-project-template]")
                            const projectsList = document.querySelector("[data-project-list]")

                            data.projects.forEach(project => {
                                const projectClone = projectTemplate.content.cloneNode(true).children[0]
                                const descTemplate = projectClone.querySelector("[data-desc-item]")
                                const title = projectClone.querySelector("[data-title]")
                                const image = projectClone.querySelector("[data-image]")
                                const descList = projectClone.querySelector("[data-descs]")
                                const download = projectClone.querySelector("[data-download]")
                                const test = projectClone.querySelector("[data-test]")
                                const github = projectClone.querySelector("[data-github]")

                                title.innerHTML = project.title
                                image.src = project.imageURL

                                download.setAttribute("href", project.downloadURL || "#")
                                github.setAttribute("href", project.githubURL || "#")
                                test.setAttribute("href", project.testURL || "#")

                                download.onclick = () => {
                                    openLink(project.downloadURL)
                                }
                                github.onclick = () => {
                                    openLink(project.githubURL)
                                }
                                test.onclick = () => {
                                    openLink(project.testURL)
                                }
                                checkProjectLinks(download, test, github, project)

                                project.descItems.forEach(descItem => {
                                    const descItemClone = descTemplate.content.cloneNode(true).children[0]
                                    descItemClone.innerHTML = descItem.text
                                    descList.appendChild(descItemClone)
                                })

                                projectsList.appendChild(projectClone)
                            });
                        })
                }
            }, 1000)
        } else console.warn("Unable to get pageHref", e)
    })

    $(".back").on("click", (e) => {
        e.preventDefault();
        if (!_cgb) return
        toggleSection(".section", ".section2");
    })
});

/*SCROLL HANDLER*/

$(window).scroll(function () {
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

window.particlesJS("particles-js", {
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

declare global {
    interface Window {
        particlesJS: Function,
        modules: {}
    }
}