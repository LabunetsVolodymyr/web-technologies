let config = {
    red: 5000,
    yellow: 3000,
    green: 7000
};

let currentTimeout;
let flashInterval;
let states = ['red', 'yellow', 'green', 'yellow-flash'];
let currentStateIndex = 0;
let isActive = false; // Прапор, чи працює світлофор зараз

function clearAll() {
    clearTimeout(currentTimeout);
    clearInterval(flashInterval);
    const lamps = document.querySelectorAll('.lamp');
    lamps.forEach(l => {
        l.classList.remove('active');
        l.style.visibility = 'visible';
    });
}

// Тепер тільки вмикає лампу, без тексту
function updateUI(activeColorId) {
    clearAll();
    const lamp = document.getElementById(activeColorId);
    if (lamp) lamp.classList.add('active');
}

function runCycle() {
    if (!isActive) return; // Якщо вимкнено — нічого не робимо

    const state = states[currentStateIndex];

    if (state === 'red') {
        updateUI('red');
        currentTimeout = setTimeout(nextState, config.red);
    }
    else if (state === 'yellow') {
        updateUI('yellow');
        currentTimeout = setTimeout(nextState, config.yellow);
    }
    else if (state === 'green') {
        updateUI('green');
        currentTimeout = setTimeout(nextState, config.green);
    }
    else if (state === 'yellow-flash') {
        clearAll();
        let flashCount = 0;
        const yellowLamp = document.getElementById('yellow');
        yellowLamp.classList.add('active');

        flashInterval = setInterval(() => {
            yellowLamp.style.visibility = (yellowLamp.style.visibility === 'hidden') ? 'visible' : 'hidden';
            flashCount++;

            if (flashCount >= 6) {
                clearInterval(flashInterval);
                nextState();
            }
        }, 500);
    }
}

function nextState() {
    if (!isActive) return;
    currentStateIndex = (currentStateIndex + 1) % states.length;
    runCycle();
}

// Кнопка "Запустити"
function initTrafficLight() {
    isActive = true;
    currentStateIndex = 0;
    runCycle();
}

// Кнопка "Виключити"
function stopTrafficLight() {
    isActive = false;
    clearAll(); // Гасимо всі лампи і зупиняємо таймери
}

function manualNext() {
    if (!isActive) return;
    clearAll();
    nextState();
}

function setupTimes() {
    const r = prompt("Червоний (сек):", config.red / 1000);
    const y = prompt("Жовтий (сек):", config.yellow / 1000);
    const g = prompt("Зелений (сек):", config.green / 1000);

    if (r && y && g) {
        config.red = Number(r) * 1000;
        config.yellow = Number(y) * 1000;
        config.green = Number(g) * 1000;
    }
}