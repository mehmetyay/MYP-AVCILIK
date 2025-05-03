document.getElementById("switch-to-register").addEventListener("click", function() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
});

document.getElementById("switch-to-login").addEventListener("click", function() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});


// Giriş formu işlemleri
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    alert(`Giriş yapıldı: ${email}`);
});

// Kayıt formu işlemleri
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Şifreler eşleşmiyor!");
        return;
    }
    alert(`Kayıt olundu: ${email}`);
});
