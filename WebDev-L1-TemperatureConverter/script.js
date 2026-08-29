const tempInput = document.getElementById('tempInput');
const unitSelect = document.getElementById('unitSelect');
const convertBtn = document.getElementById('convertBtn');
const errorBox = document.getElementById('errorBox');

const celsiusVal = document.getElementById('celsiusVal');
const fahrenheitVal = document.getElementById('fahrenheitVal');
const kelvinVal = document.getElementById('kelvinVal');

function clearResults() {
    celsiusVal.textContent = '-- °C';
    fahrenheitVal.textContent = '-- °F';
    kelvinVal.textContent = '-- K';
}

function showError(message) {
    errorBox.textContent = message;
    errorBox.style.display = 'block';
    clearResults();
}

function hideError() {
    errorBox.style.display = 'none';
    errorBox.textContent = '';
}

function convertTemperature() {
    hideError();
    const rawInput = tempInput.value.trim();

    // 1. Validation: Reject Non-Numeric / Empty Input
    if (rawInput === '' || isNaN(rawInput)) {
        showError('Please enter a valid numeric temperature value.');
        return;
    }

    const val = parseFloat(rawInput);
    const unit = unitSelect.value;

    // 2. Edge Case Handling: Absolute Zero Violations
    if (unit === 'celsius' && val < -273.15) {
        showError('Value cannot be below Absolute Zero (-273.15 °C).');
        return;
    }
    if (unit === 'fahrenheit' && val < -459.67) {
        showError('Value cannot be below Absolute Zero (-459.67 °F).');
        return;
    }
    if (unit === 'kelvin' && val < 0) {
        showError('Value cannot be below Absolute Zero (0 K).');
        return;
    }

    let c, f, k;

    // Standard Conversion Formulas
    if (unit === 'celsius') {
        c = val;
        f = (val * 9 / 5) + 32;
        k = val + 273.15;
    } else if (unit === 'fahrenheit') {
        c = (val - 32) * 5 / 9;
        f = val;
        k = ((val - 32) * 5 / 9) + 273.15;
    } else if (unit === 'kelvin') {
        c = val - 273.15;
        f = ((val - 273.15) * 9 / 5) + 32;
        k = val;
    }

    // 3. Output Display: Simultaneous Update with Unit Labels
    celsiusVal.textContent = `${c.toFixed(2)} °C`;
    fahrenheitVal.textContent = `${f.toFixed(2)} °F`;
    kelvinVal.textContent = `${k.toFixed(2)} K`;
}

// Convert Button Event Trigger
convertBtn.addEventListener('click', convertTemperature);

// Dynamic Input Clear Event Listener
tempInput.addEventListener('input', function() {
    if (tempInput.value.trim() === '') {
        hideError();
        clearResults();
    }
});