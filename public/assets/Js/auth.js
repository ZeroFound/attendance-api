// Authentication Functions

console.log('🔐 Auth Module loaded');

// Check if already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded');

    // Check token
    const token = getToken();
    if (token) {
        console.log('🔑 Token found, initializing app...');
        initApp();
    } else {
        console.log('🔓 No token found, showing login page');
    }
});

// Login Form Handler
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('🔄 Attempting login:', email);

    // Disable submit button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Loading...';

    try {
        const response = await API.login(email, password);

        if (response.status === 'success') {
            setToken(response.token);
            setUser(response.user);

            showAlert('loginAlert', '✅ Login berhasil! Redirecting...', 'success');

            console.log('✅ Login successful:', response.user.name);

            setTimeout(() => {
                initApp();
            }, 1000);
        } else {
            showAlert('loginAlert', '❌ ' + (response.message || 'Login gagal'), 'danger');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        showAlert('loginAlert', '❌ Terjadi kesalahan: ' + error.message, 'danger');
        console.error('Login error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Register Form Handler
async function handleRegister(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        role: document.getElementById('regRole').value,
        npm: document.getElementById('regNPM').value || null
    };

    console.log('🔄 Attempting registration:', data.email);

    // Disable submit button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Loading...';

    try {
        const response = await API.register(data);

        if (response.status === 'success') {
            showAlert('registerAlert', '✅ Registrasi berhasil! Silakan login.', 'success');

            console.log('✅ Registration successful');

            // Reset form
            e.target.reset();

            setTimeout(() => {
                showLoginPage();
            }, 2000);
        } else {
            const errorMsg = response.errors
                ? Object.values(response.errors).flat().join(', ')
                : response.message;
            showAlert('registerAlert', '❌ ' + errorMsg, 'danger');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    } catch (error) {
        showAlert('registerAlert', '❌ Terjadi kesalahan: ' + error.message, 'danger');
        console.error('Register error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Quick Login (for demo)
function quickLogin(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;

    const form = document.getElementById('loginForm');
    form.dispatchEvent(new Event('submit'));
}

// Logout
async function logout() {
    if (!confirm('Yakin ingin logout?')) return;

    console.log('🔄 Logging out...');

    try {
        await API.logout();
    } catch (error) {
        console.log('Logout error:', error);
    }

    removeToken();

    console.log('✅ Logged out successfully');

    window.location.reload();
}

// Toggle NPM field based on role
function toggleNPM() {
    const role = document.getElementById('regRole').value;
    const npmField = document.getElementById('npmField');
    const npmInput = document.getElementById('regNPM');

    if (role === 'mahasiswa') {
        npmField.style.display = 'block';
        npmInput.required = true;
    } else {
        npmField.style.display = 'none';
        npmInput.required = false;
        npmInput.value = '';
    }
}

// Show Login Page
function showLoginPage() {
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// Show Register Page
function showRegisterPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'block';
}

console.log('✅ Auth Module initialized');
