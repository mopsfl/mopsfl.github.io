const buttons = document.querySelectorAll("button")

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (button.getAttribute("data-ripple") != null) {
        button.onclick = (e) => {
            console.log(button)
                //const x = getOffset(e).x - 14
                //const y = getOffset(e).y - 19
            const x = e.clientX - e.target.getBoundingClientRect().x
            const y = e.clientY - e.target.getBoundingClientRect().y
            console.log(x, y, getOffset(e).x, getOffset(e).y)
                //client y - e.target. getboundingclientrect().x
            if (!(x || y)) return

            const ripple = document.createElement("span")
            ripple.classList.add("btn-ripple")

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
            }, 2500)
        }
    }
}

function getOffset(e) {
    if (e == null) return
    var element = e.target,
        x = 0,
        y = 0;
    while (e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
        x += el.offsetLeft - e.scrollLeft
        y += el.offsetTop - e.scrollTop
        e = e.offsetParent
    }

    x = e.clientX - x
    y = e.clientY - y
    return { x: x, y: y }
}