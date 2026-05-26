/* ==========================================
   SIDEBAR TOGGLE
========================================== */

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
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
        }
    }
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-overlay").classList.remove("active");
}

/* ==========================================
   DARK MODE
========================================== */

function toggleDark() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* ==========================================
   DROPDOWN
========================================== */

function toggleDropdown(e) {
    e.stopPropagation();
    const d = document.getElementById("dropdown");
    if (d) {
        d.style.display = (d.style.display === "block") ? "none" : "block";
    }
}

document.addEventListener("click", function () {
    const d = document.getElementById("dropdown");
    if (d) d.style.display = "none";
});

/* ==========================================
   NOTIFICATIONS
========================================== */

function loadNotifications() {
    fetch("/notifications/")
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
}

setInterval(loadNotifications, 5000);
loadNotifications();

/* ==========================================
   CSRF
========================================== */

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

/* ==========================================
   LOGOUT MODAL
========================================== */

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