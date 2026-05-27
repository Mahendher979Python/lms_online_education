<<<<<<< HEAD
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
=======
/* ==========================================
   SIDEBAR TOGGLE
========================================== */
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
<<<<<<< HEAD
=======
<<<<<<< HEAD
    const navbar = document.getElementById("navbar");
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        sidebar.classList.toggle("open");
        document.getElementById("sidebar-overlay").classList.toggle("active");
    } else {
        const isOpen = !sidebar.classList.contains("closed");
        if (isOpen) {
            // Close sidebar
            sidebar.classList.add("closed");
            main.classList.remove("shifted");
            navbar.classList.remove("shifted");
        } else {
            // Open sidebar
            sidebar.classList.remove("closed");
            main.classList.add("shifted");
            navbar.classList.add("shifted");
=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !main) return;

    sidebar.classList.toggle("closed");
    main.classList.toggle("full");
<<<<<<< HEAD
    if (overlay && window.innerWidth >= 769) overlay.classList.remove("active");
    syncSidebarLayout();
}

function closeSidebar() {
=======
    if (overlay) overlay.classList.toggle("active");
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.innerWidth >= 769) {
            navbar.style.left = sidebar.classList.contains("closed") ? "260px" : "0px";
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
}

/* ==========================================
   DARK MODE
========================================== */

=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.remove("closed");
    if (main) main.classList.remove("full");
    if (overlay) overlay.classList.remove("active");
<<<<<<< HEAD
    syncSidebarLayout();
}

=======
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.style.left = "0px";
}

>>>>>>> 0b4d033f75e47fcd700689babb32ce299e149377
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
function toggleDark() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

<<<<<<< HEAD
/* TOGGLE DROPDOWN */
function toggleDropdown(e) {
    e.stopPropagation();
    const d = document.getElementById("dropdown");
    if (!d) return;
    d.style.display = (d.style.display === "block") ? "none" : "block";
}

/* CLOSE OUTSIDE */
=======
/* ==========================================
   DROPDOWN
========================================== */

function toggleDropdown(e) {
    e.stopPropagation();
    const d = document.getElementById("dropdown");
<<<<<<< HEAD
    if (d) {
        d.style.display = (d.style.display === "block") ? "none" : "block";
    }
=======
    if (!d) return;
    d.style.display = (d.style.display === "block") ? "none" : "block";
>>>>>>> 0b4d033f75e47fcd700689babb32ce299e149377
}

>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
document.addEventListener("click", function () {
    const d = document.getElementById("dropdown");
    if (d) d.style.display = "none";
});

<<<<<<< HEAD
/* LOAD NOTIFICATIONS */
function loadNotifications() {
    fetch("/notifications/")
=======
/* ==========================================
   NOTIFICATIONS
========================================== */

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

            const dropdown = document.getElementById("dropdown");
            if (!dropdown) return;

            dropdown.innerHTML = "";

            if (data.notifications.length === 0) {
                dropdown.innerHTML = "<div style='padding:10px;'>No notifications</div>";
                return;
            }

            data.notifications.forEach(n => {
                const div = document.createElement("div");
                div.className = "notif-item " + n.type;
                div.innerHTML = `
                    <b>${n.type.toUpperCase()}</b><br>
                    ${n.message}<br>
                    <small>${n.course || ""}</small><br>
                    <small style="color:gray">${n.time}</small>
                `;
                div.onclick = function () {
                    fetch(`/notifications/read/${n.id}/`, {
                        method: "POST",
                        headers: { "X-CSRFToken": getCookie("csrftoken") }
                    });
                    div.style.opacity = "0.5";
                };
                dropdown.appendChild(div);
            });
        })
        .catch(() => {}); // silently ignore errors
=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
    .then(res => res.json())
    .then(data => {
        const dropdown = document.getElementById("dropdown");
        const count =
            document.getElementById("count") ||
            document.getElementById("notif-count"); // used by newer templates

        if (count) count.innerText = data.unread_count || 0;

        // If this page doesn't have a dropdown list, just update the badge count.
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
<<<<<<< HEAD
}

document.addEventListener("DOMContentLoaded", function () {
    syncSidebarLayout();
=======
>>>>>>> 0b4d033f75e47fcd700689babb32ce299e149377
}

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const sidebar = document.getElementById("sidebar");
    if (navbar) {
        if (window.innerWidth >= 769 && sidebar && sidebar.classList.contains("closed")) {
            navbar.style.left = "260px";
        } else {
            navbar.style.left = "0px";
        }
    }
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b

    loadNotifications();
    setInterval(loadNotifications, 5000);
});

<<<<<<< HEAD
window.addEventListener("resize", function () {
    syncSidebarLayout();
});

/* CSRF */
=======
/* ==========================================
   CSRF
========================================== */

>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
function getCookie(name) {
    let cookieValue = null;
    document.cookie.split(';').forEach(c => {
        c = c.trim();
        if (c.startsWith(name + '=')) {
            cookieValue = decodeURIComponent(c.substring(name.length + 1));
        }
    });
    return cookieValue;
}

<<<<<<< HEAD
/* 3D LOGOUT MODAL ACTION HANDLERS */
=======
/* ==========================================
   LOGOUT MODAL
========================================== */

>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
function showLogoutModal(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const modal = document.getElementById("logout-confirm-modal");
<<<<<<< HEAD
    if (modal) {
        modal.classList.add("active");
    }
=======
    if (modal) modal.classList.add("active");
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
}

function closeLogoutModal() {
    const modal = document.getElementById("logout-confirm-modal");
<<<<<<< HEAD
    if (modal) {
        modal.classList.remove("active");
    }
=======
    if (modal) modal.classList.remove("active");
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
}

function confirmLogout() {
    const form = document.getElementById("logout-post-form");
    if (form) {
        form.submit();
    } else {
<<<<<<< HEAD
        // Fallback to simple redirect if form is not found
        window.location.href = "/en/logout/";
    }
}
=======
        window.location.href = "/en/logout/";
    }
}
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
