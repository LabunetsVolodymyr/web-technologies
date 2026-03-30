setInterval(() => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = d.getSeconds();
    const secondsDisplay = (s % 2 === 0) ? String(s).padStart(2, '0') : "  ";
    document.getElementById('clock').innerText = `${h}:${m}:${secondsDisplay}`;
}, 500);


function calculateBday() {
    const val = document.getElementById('bdayInput').value;
    if(!val) return;
    const now = new Date();
    let bday = new Date(val);
    bday.setFullYear(now.getFullYear());
    if (now > bday) bday.setFullYear(now.getFullYear() + 1);

    const diff = bday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    document.getElementById('bdayResult').innerText = `Залишилось: ${days} дн. та ${hours} год.`;
}

let countdownInt;
function startCountdown() {
    clearInterval(countdownInt);
    const target = new Date(document.getElementById('timerInput').value).getTime();
    countdownInt = setInterval(() => {
        const now = new Date().getTime();
        const dist = target - now;
        if (dist < 0) {
            clearInterval(countdownInt);
            document.getElementById('timerDisplay').innerText = "ЧАС ВИЙШОВ!";
            return;
        }
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);
        document.getElementById('timerDisplay').innerText = `${h}г ${m}хв ${s}с`;
    }, 1000);
}