const passwordInput = document.getElementById('password');
const generateBtn = document.getElementById('generate-btn');
const saveBtn = document.getElementById('save-btn');
const showPasswordsBtn = document.getElementById('show-passwords-btn');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const passwordList = document.getElementById('password-list');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModalBtn = document.getElementById('close-modal');
const passwordStrengthIndicator = document.getElementById('strength-indicator');
const strengthMeter = document.getElementById('strength-meter');

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    let charSet = '';
    if (includeUppercase) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charSet += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charSet += '0123456789';
    if (includeSymbols) charSet += '!@#$%^&*()_+[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }
    return password;
}

function evaluatePasswordStrength(password) {
    let strength = 'Weak';
    const lengthCriteria = password.length >= 12;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const symbolCriteria = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    const criteriaMet = [lengthCriteria, upperCaseCriteria, lowerCaseCriteria, numberCriteria, symbolCriteria].filter(Boolean).length;

    if (criteriaMet >= 4) {
        strength = 'Strong';
    } else if (criteriaMet >= 2) {
        strength = 'Medium';
    }

    return strength;
}

generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthInput.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passwordInput.value = password;

    const strength = evaluatePasswordStrength(password);
    passwordStrengthIndicator.textContent = strength;

    // Update strength meter
    strengthMeter.className = `strength-meter ${strength.toLowerCase()}`;
    strengthMeter.classList.remove('hidden');

    // Show password strength indicator
    const passwordStrengthDiv = document.getElementById('password-strength');
    passwordStrengthDiv.classList.remove('hidden');
});

saveBtn.addEventListener('click', () => {
    const password = passwordInput.value;
    if (password) {
        const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
        savedPasswords.push(password);
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
        showModal('Password saved!');
        togglePasswordList();
    } else {
        showModal('Please generate a password first.');
    }
});

showPasswordsBtn.addEventListener('click', togglePasswordList);

function togglePasswordList() {
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
    passwordList.innerHTML = '';

    if (savedPasswords.length === 0) {
        passwordList.classList.add('hidden');
    } else {
        savedPasswords.forEach((password, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'bg-gray-700 p-3 rounded-lg flex justify-between items-center';
            listItem.innerHTML = `
                <span class="text-white">${password}</span>
                <button class="text-red-500 ml-4" onclick="deletePassword(${index})"><i class="fas fa-trash"></i></button>
            `;
            passwordList.appendChild(listItem);
        });
        passwordList.classList.remove('hidden');
    }
}

function deletePassword(index) {
    const savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];
    savedPasswords.splice(index, 1);
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    togglePasswordList();
}

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Display the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
