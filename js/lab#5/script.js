let autoOffTimeout;
const bulb = document.getElementById('bulb');

function toggleBulb() {
    bulb.classList.toggle('on');
    resetAutoOff();
}

function updateType() {
    const type = document.getElementById('bulbType').value;
    console.log(`Вибрано тип: ${type}`);
    resetAutoOff();
}

function setBrightness() {
    const type = document.getElementById('bulbType').value;
    if (type === 'standard' || type === 'led') {
        const val = prompt("Введіть яскравість (10-100%):", "100");
        if (val) bulb.style.opacity = val / 100;
    } else {
        alert("Цей тип лампочки не підтримує регулювання яскравості.");
    }
}

function resetAutoOff() {
    clearTimeout(autoOffTimeout);
    autoOffTimeout = setTimeout(() => {
        bulb.classList.remove('on');
        alert("Лампочку вимкнено автоматично через бездіяльність.");
    }, 5 * 60 * 1000);
}