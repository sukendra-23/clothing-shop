// js/auth.js

// Check Password Strength
function checkPasswordStrength(password) {
    const meter = document.getElementById('pwd-meter');
    const fill = document.getElementById('pwd-fill');
    const text = document.getElementById('pwd-text');

    if (!meter || !fill || !text) return;

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    let width = '0%';
    let color = '';
    let strengthText = 'Strength';

    switch (strength) {
        case 0:
            width = '0%';
            color = 'transparent';
            strengthText = 'Very Weak';
            break;
        case 1:
            width = '25%';
            color = 'var(--clr-error)';
            strengthText = 'Weak';
            break;
        case 2:
            width = '50%';
            color = '#f97316'; // Orange
            strengthText = 'Medium';
            break;
        case 3:
            width = '75%';
            color = '#eab308'; // Yellow
            strengthText = 'Strong';
            break;
        case 4:
            width = '100%';
            color = 'var(--clr-success)';
            strengthText = 'Very Strong';
            break;
    }

    fill.style.width = width;
    fill.style.backgroundColor = color;
    text.textContent = strengthText;
    text.style.color = color || 'var(--clr-text-muted)';
}

// User Registration
function authRegister() {
    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const pwdInput = document.getElementById('reg-pwd');
    const confirmPwdInput = document.getElementById('reg-pwd-confirm');

    if (!nameInput || !emailInput || !pwdInput || !confirmPwdInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = pwdInput.value;
    const confirmPassword = confirmPwdInput.value;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters long', 'error');
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('cloth_registered_users')) || [];

    // Check if user exists
    const userExists = users.some(u => u.email === email);
    if (userExists) {
        showToast('Email is already registered', 'error');
        return;
    }

    // Register user
    const newUser = {
        name,
        email,
        password // Stored in plain text for dummy database simulation
    };

    users.push(newUser);
    localStorage.setItem('cloth_registered_users', JSON.stringify(users));

    showToast('Registration successful! Redirecting to login...', 'success');

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// User Login
function authLogin() {
    const emailInput = document.getElementById('login-email');
    const pwdInput = document.getElementById('login-pwd');

    if (!emailInput || !pwdInput) return;

    const email = emailInput.value.trim().toLowerCase();
    const password = pwdInput.value;

    if (!email || !password) {
        showToast('Please enter both email and password', 'error');
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('cloth_registered_users')) || [];

    // Find matching user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Authenticate via store
        AuthStore.login({
            name: user.name,
            email: user.email
        });

        showToast('Login successful! Welcome back.', 'success');

        setTimeout(() => {
            // Redirect to home page
            window.location.href = 'index.html';
        }, 1200);
    } else {
        // Fallback: If no registered users exist, allow testing with dummy details
        if (users.length === 0 && email === 'guest@cloth.com' && password === 'guest123') {
            AuthStore.login({
                name: 'Guest User',
                email: 'guest@cloth.com'
            });
            showToast('Login successful! Welcome Guest.', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
            return;
        }

        // Standard error toast
        showToast('Invalid email or password. Use guest@cloth.com / guest123 to test.', 'error');
    }
}
