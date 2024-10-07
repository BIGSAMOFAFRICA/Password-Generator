const year = new Date().getFullYear();
document.getElementById('year').textContent = year;
const passwordField = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const saveBtn = document.getElementById('save-btn');
const generateBtn = document.getElementById('generate-btn');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const strengthIndicator = document.getElementById('strength-indicator');
const strengthText = document.getElementById('strength-text');

const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+{}[]<>?'
};

function generatePassword() {
    let length = parseInt(lengthInput.value);
    let charset = '';

    if (uppercaseCheckbox.checked) charset += characters.uppercase;
    if (lowercaseCheckbox.checked) charset += characters.lowercase;
    if (numbersCheckbox.checked) charset += characters.numbers;
    if (symbolsCheckbox.checked) charset += characters.symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    passwordField.value = password;
    updateStrength(password);
}

function updateStrength(password) {
    let strength = 0;
    if (password.length >= 16) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*()_+{}[\]<>?]/.test(password)) strength += 1;

    strengthIndicator.style.width = `${strength * 20}%`;

    if (strength === 5) {
        strengthText.textContent = 'Very Strong';
        strengthIndicator.classList.add('bg-green-500');
        strengthIndicator.classList.remove('bg-yellow-500', 'bg-red-500');
    } else if (strength >= 3) {
        strengthText.textContent = 'Strong';
        strengthIndicator.classList.add('bg-yellow-500');
        strengthIndicator.classList.remove('bg-green-500', 'bg-red-500');
    } else {
        strengthText.textContent = 'Weak';
        strengthIndicator.classList.add('bg-red-500');
        strengthIndicator.classList.remove('bg-green-500', 'bg-yellow-500');
    }
}

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordField.value);
    alert('Password copied to clipboard!');
});

saveBtn.addEventListener('click', () => {
    let password = passwordField.value;
    if (password) {
        let savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        savedPasswords.push(password);
        localStorage.setItem('passwords', JSON.stringify(savedPasswords));
        alert('Password saved successfully!');

        console.log("Saved Passwords:", savedPasswords); 
    } else {
        alert('Generate a password first!');
    }
});
if (document.getElementById('password-list')) {
    const passwordList = document.getElementById('password-list');
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    
    console.log("Retrieved Saved Passwords:", savedPasswords); // 
    savedPasswords.forEach(pwd => {
        const listItem = document.createElement('li');
        listItem.textContent = pwd;
        listItem.className = 'text-gray-300';
        passwordList.appendChild(listItem);
    });
}
