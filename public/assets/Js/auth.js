// Authentication Functions

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Check if already logged in
    if (getToken()) {
        initApp();
    }
});

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await API.login(email, password);

        if (response.status === 'success') {
            setToken(response.token);
            setUser(response.user);

            showAlert('loginAlert', 'Login berhasil! Redirecting...', 'success');

            setTimeout(() => {
                initApp();
            }, 1000);
        } else {
            showAlert('loginAlert', response.message || 'Login gagal', 'danger');
        }
    } catch (error) {
        showAlert('loginAlert', 'Terjadi kesalahan: ' + error.message, 'danger');
    }
}

async function handleRegister(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value,
        role: document.getElementById('regRole').value,
        npm: document.getElementById('regNPM').value || null
    };

    try {
        const response = await API.register(data);

        if (response.status === 'success') {
            showAlert('registerAlert', 'Registrasi berhasil! Silakan login.', 'success');

            setTimeout(() => {
                showLoginPage();
            }, 2000);
        } else {
            const errorMsg = response.errors
                ? Object.values(response.errors).flat().join(', ')
                : response.message;
            showAlert('registerAlert', errorMsg, 'danger');
        }
    } catch (error) {
        showAlert('registerAlert', 'Terjadi kesalahan: ' + error.message, 'danger');
    }
}

function quickLogin(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

async function logout() {
    try {
        await API.logout();
    } catch (error) {
        console.log('Logout error:', error);
    }

    removeToken();
    window.location.reload();
}

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

function showLoginPage() {
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

function showRegisterPage() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'block';
}
