document.addEventListener("DOMContentLoaded", () => {
    const toggleBtns = document.querySelectorAll(".toggle-password");
    toggleBtns.forEach(function(toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            if (!input) return;
            input.type = input.type === "password" ? "text" : "password";
            this.classList.toggle("fa-eye");
            this.classList.toggle("fa-eye-slash");
        });
    });
});

