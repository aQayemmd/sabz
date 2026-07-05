// --- منوی موبایل ---
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
