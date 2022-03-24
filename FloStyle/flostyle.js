/*RIPPLE EFFECT*/

const btns = document.querySelectorAll(".btn-ripple");

for (let i = 0; i < btns.length; i++) {
    const element = btns[i];
    element.onclick = function(e) {
        if (element.classList.contains("disabled")) return
        let ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        let x = e.pageX - e.target.offsetLeft;
        let y = e.pageY - e.target.offsetTop;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        setTimeout(() => {
            ripple.remove();
        }, 300);
    };
}