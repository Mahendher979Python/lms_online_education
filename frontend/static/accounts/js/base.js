const hamburgerBtn = document.querySelector('.hamburger-btn');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const closeBtn = document.querySelector('.close-btn');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

hamburgerBtn.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

sidebarLinks.forEach(link => {
    link.addEventListener('click', toggleSidebar);
});
