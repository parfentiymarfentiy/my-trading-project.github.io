class QuantumAuth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUser();
        this.setupAuthForms();
        this.checkAuthState();
    }

    loadUser() {
        const savedUser = localStorage.getItem('quantum_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }
    }

    setupAuthForms() {
    }

    checkAuthState() {
        if (this.currentUser && window.location.pathname.includes('auth.html')) {
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
        }
    }

    updateUI() {
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        
        if (this.currentUser && loginBtn) {
            loginBtn.innerHTML = `<span class="btn-icon">👤</span> ${this.currentUser.name}`;
            registerBtn.innerHTML = `<span class="btn-icon">🚪</span> ВЫХОД`;
            registerBtn.onclick = () => this.logout();
        }
    }

    logout() {
        localStorage.removeItem('quantum_user');
        this.currentUser = null;
        showNotification('Выход выполнен успешно!', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getUser() {
        return this.currentUser;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.quantumAuth = new QuantumAuth();
});