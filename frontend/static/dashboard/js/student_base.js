<<<<<<< HEAD
/* =========================================
   DOM LOADED
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const navbar = document.querySelector(".navbar");
    const main = document.querySelector(".main");
    const notifCount = document.getElementById("notif-count");

    let sidebarOpen = true;

    /* =========================================
       SIDEBAR TOGGLE
    ========================================= */

    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            // MOBILE
            if (window.innerWidth <= 992) {

                sidebar.classList.toggle("show");
                overlay.classList.toggle("active");

            }

            // DESKTOP
            else {

                if (sidebarOpen) {

                    sidebar.style.left = "-280px";

                    navbar.style.left = "0";

                    main.style.marginLeft = "0";

                    sidebarOpen = false;

                } else {

                    sidebar.style.left = "0";

                    navbar.style.left = "280px";

                    main.style.marginLeft = "280px";

                    sidebarOpen = true;
                }
            }
        });
    }

    /* =========================================
       OVERLAY CLICK
    ========================================= */

    if (overlay) {

        overlay.addEventListener("click", function () {

            closeSidebar();
        });
    }

    /* =========================================
       AUTO CLOSE MOBILE SIDEBAR
    ========================================= */

    document.querySelectorAll(".sidebar a").forEach(link => {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 992) {

                closeSidebar();
            }
        });
    });

    /* =========================================
       NOTIFICATION COUNT
    ========================================= */

    let count = 3;

    if (notifCount) {

        notifCount.innerText = count;

        if (count <= 0) {

            notifCount.style.display = "none";
        }
    }

    /* =========================================
       THEME LOAD
    ========================================= */

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.remove("dark");
        document.documentElement.classList.remove("dark");

    } else {

        document.body.classList.add("dark");
        document.documentElement.classList.add("dark");
    }
});

/* =========================================
   CLOSE SIDEBAR
========================================= */

function closeSidebar() {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    sidebar.classList.remove("show");
    overlay.classList.remove("active");
}

/* =========================================
   DARK / LIGHT MODE
========================================= */

function toggleDark() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");

    } else {

        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
    }
}

/* =========================================
   LOGOUT MODAL
========================================= */

function showLogoutModal(event) {

    event.preventDefault();

    document
        .getElementById("logout-confirm-modal")
        .classList.add("active");
}

function closeLogoutModal() {

    document
        .getElementById("logout-confirm-modal")
        .classList.remove("active");
}

function confirmLogout() {

    document
        .getElementById("logout-post-form")
        .submit();
}

/* =========================================
   WINDOW RESIZE
========================================= */

window.addEventListener("resize", function () {

    const sidebar = document.getElementById("sidebar");
    const navbar = document.querySelector(".navbar");
    const main = document.querySelector(".main");

    if (window.innerWidth > 992) {

        sidebar.classList.remove("show");

        sidebar.style.left = "0";
        navbar.style.left = "280px";
        main.style.marginLeft = "280px";
    }
});
=======
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
<<<<<<< HEAD
    const navbar = document.getElementById("navbar");
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        sidebar.classList.toggle("open");
        document.getElementById("sidebar-overlay").classList.toggle("active");
    } else {
        const isOpen = !sidebar.classList.contains("closed");
        if (isOpen) {
            sidebar.classList.add("closed");
            main.classList.remove("shifted");
            navbar.classList.remove("shifted");
        } else {
            sidebar.classList.remove("closed");
            main.classList.add("shifted");
            navbar.classList.add("shifted");
=======
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !main) return;

    sidebar.classList.toggle("closed");
    main.classList.toggle("full");
    if (overlay) overlay.classList.toggle("active");
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.innerWidth >= 769) {
            navbar.style.left = navbar.style.left === "260px" ? "0px" : "260px";
        } else {
            navbar.style.left = "0px";
>>>>>>> 0b4d033f75e47fcd700689babb32ce299e149377
        }
    }
}

function closeSidebar() {
<<<<<<< HEAD
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("active");
=======
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.remove("closed");
    if (main) main.classList.remove("full");
    if (overlay) overlay.classList.remove("active");
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.style.left = "0px";
>>>>>>> 0b4d033f75e47fcd700689babb32ce299e149377
}

function toggleDark() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

function loadNotifications() {
    fetch("/notifications/")
<<<<<<< HEAD
        .then(res => res.json())
        .then(data => {
            const badge = document.getElementById("notif-count");
            if (badge) {
                if (data.unread_count > 0) {
                    badge.innerText = data.unread_count;
                    badge.style.display = "flex";
                } else {
                    badge.style.display = "none";
                }
            }
        })
        .catch(() => {});
=======
    .then(res => res.json())
    .then(data => {

        const dropdown = document.getElementById("dropdown");
        const count =
            document.getElementById("count") ||
            document.getElementById("notif-count"); // used by newer templates

        if (count) count.innerText = data.unread_count || 0;

        // If the page doesn't have a dropdown list, just update the badge count.
        if (!dropdown) return;

        dropdown.innerHTML = "";

        if (!data.notifications || data.notifications.length === 0) {
            dropdown.innerHTML = "<div style='padding:10px;'>No notifications</div>";
            return;
        }

        data.notifications.forEach(n => {
            const div = document.createElement("div");

            div.className = "notif-item " + (n.type || "");

            div.innerHTML = `
                <b>${n.type ? n.type.toUpperCase() : "INFO"}</b><br>
                ${n.message || ""}<br>
                <small>${n.course || ""}</small><br>
                <small style="color:gray">${n.time || ""}</small>
            `;

            div.onclick = function () {
                fetch(`/notifications/read/${n.id}/`, {
                    method: "POST",
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken")
                    }
                });
                div.style.opacity = "0.5";
            };

            dropdown.appendChild(div);
        });
    })
    .catch(() => {});
>>>>>>> 0b4d033f75e47fcd700689babb32ce299e149377
}

setInterval(loadNotifications, 5000);
loadNotifications();

<<<<<<< HEAD
=======
    const box = document.getElementById("notifBox");
    const dropdown = document.getElementById("dropdown");

    if (box && dropdown) {
        box.addEventListener("click", function (e) {
            dropdown.style.display =
                dropdown.style.display === "block" ? "none" : "block";
            e.stopPropagation();
        });

        document.addEventListener("click", function () {
            dropdown.style.display = "none";
        });
    }

    loadNotifications();
    setInterval(loadNotifications, 5000);
});

/* CSRF */
>>>>>>> 0b4d033f75e47fcd700689babb32ce299e149377
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

function showLogoutModal(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const modal = document.getElementById("logout-confirm-modal");
    if (modal) modal.classList.add("active");
}

function closeLogoutModal() {
    const modal = document.getElementById("logout-confirm-modal");
    if (modal) modal.classList.remove("active");
}

function confirmLogout() {
    const form = document.getElementById("logout-post-form");
    if (form) {
        form.submit();
    } else {
        window.location.href = "/en/logout/";
    }
}
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
