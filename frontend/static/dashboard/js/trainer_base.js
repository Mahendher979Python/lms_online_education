// Shared trainer dashboard helpers (sidebar, theme, notifications, logout)
// Note: trainer_base.html also includes inline fallbacks; this file ensures
// functionality works even if the inline script is removed/changed.

function syncSidebarLayout() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const overlay = document.getElementById("sidebar-overlay");
    const navbar = document.querySelector(".navbar");

    if (window.innerWidth >= 769) {
        if (overlay) overlay.classList.remove("active");
        if (navbar) {
            navbar.style.left = sidebar && sidebar.classList.contains("closed") ? "260px" : "0px";
        }
        return;
    }

    if (navbar) navbar.style.left = "0px";
    if (overlay) {
        if (sidebar && sidebar.classList.contains("closed")) {
            overlay.classList.add("active");
        } else {
            overlay.classList.remove("active");
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !main) return;

    sidebar.classList.toggle("closed");
    main.classList.toggle("full");
    if (overlay && window.innerWidth >= 769) overlay.classList.remove("active");
    syncSidebarLayout();
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.remove("closed");
    if (main) main.classList.remove("full");
    if (overlay) overlay.classList.remove("active");
    syncSidebarLayout();
}

function toggleDark() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function loadNotifications() {
    fetch("/notifications/")
        .then(res => res.json())
        .then(data => {
            const badge = document.getElementById("notif-count");
            if (!badge) return;

            const unread = data.unread_count || 0;
            badge.innerText = unread;
            badge.style.display = unread > 0 ? "flex" : "none";
        })
        .catch(() => {});
}

document.addEventListener("DOMContentLoaded", function () {
    syncSidebarLayout();

    loadNotifications();
    setInterval(loadNotifications, 5000);
});

window.addEventListener("resize", function () {
    syncSidebarLayout();
});

/* CSRF */
function getCookie(name) {
    let cookieValue = null;
    document.cookie.split(";").forEach(c => {
        c = c.trim();
        if (c.startsWith(name + "=")) {
            cookieValue = decodeURIComponent(c.substring(name.length + 1));
        }
    });
    return cookieValue;
}

/* 3D LOGOUT MODAL ACTION HANDLERS */
function showLogoutModal(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const modal = document.getElementById("logout-confirm-modal");
    if (modal) {
        modal.classList.add("active");
    }
}

function closeLogoutModal() {
    const modal = document.getElementById("logout-confirm-modal");
    if (modal) {
        modal.classList.remove("active");
    }
}

function confirmLogout() {
    const form = document.getElementById("logout-post-form");
    if (form) {
        form.submit();
    } else {
        window.location.href = "/en/logout/";
    }
}
