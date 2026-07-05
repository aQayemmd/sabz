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

// --- راه‌اندازی اسلایدر Swiper (فقط یک بار) ---
const swiper = new Swiper('.product-thumbnails-slider', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    speed: 600,
    preventClicks: false,           // 👈 اضافه شد
    preventClicksPropagation: false, // 👈 اضافه شد
    breakpoints: {
        320: { slidesPerView: 3, spaceBetween: 10 },
        576: { slidesPerView: 4, spaceBetween: 20 }
    }
});

document.querySelector('.product-thumbnails-slider').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && e.target.dataset.full) {
        document.getElementById('main-product-image').src = e.target.dataset.full;
    }
});

// --- کنترل تعداد محصول ---
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const qtyValue = document.getElementById('qtyValue');

qtyPlus.addEventListener('click', () => {
    qtyValue.value = parseInt(qtyValue.value) + 1;
});

qtyMinus.addEventListener('click', () => {
    let current = parseInt(qtyValue.value);
    if (current > 1) {
        qtyValue.value = current - 1;
    }
});
     // --- تب‌های محصول (توضیحات / مشخصات / نظرات) ---
const tabLinks = document.querySelectorAll('.tab-link');
const tabPanes = document.querySelectorAll('.tab-pane');

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        // غیرفعال کردن همه تب‌ها و محتواها
        tabLinks.forEach(l => l.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // فعال کردن تب کلیک‌شده
        link.classList.add('active');
        const targetPane = document.getElementById(link.dataset.tab);
        targetPane.classList.add('active');
    });
});

// --- ستاره‌دهی تعاملی فرم ثبت نظر ---
const ratingStars = document.querySelectorAll('#ratingInput i');
let selectedRating = 0;

ratingStars.forEach(star => {
    star.addEventListener('mouseenter', () => {
        highlightStars(star.dataset.value);
    });

    star.addEventListener('click', () => {
        selectedRating = star.dataset.value;
        highlightStars(selectedRating);
    });
});

document.getElementById('ratingInput').addEventListener('mouseleave', () => {
    highlightStars(selectedRating);
});

function highlightStars(value) {
    ratingStars.forEach(star => {
        if (star.dataset.value <= value) {
            star.classList.remove('fa-regular');
            star.classList.add('fa-solid');
        } else {
            star.classList.remove('fa-solid');
            star.classList.add('fa-regular');
        }
    });
}

// --- دکمه‌های لایک و دیس‌لایک ---
document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const countSpan = btn.querySelector('.vote-count');
        let count = parseInt(btn.dataset.count);

        const isLike = btn.classList.contains('like-btn');
        const activeClass = isLike ? 'liked' : 'disliked';

        if (btn.classList.contains(activeClass)) {
            count -= 1;
            btn.classList.remove(activeClass);
        } else {
            count += 1;
            btn.classList.add(activeClass);
        }

        btn.dataset.count = count;
        countSpan.textContent = count.toLocaleString('fa-IR');
    });
});

// --- اسلایدر محصولات مرتبط ---
const relatedSwiper = new Swiper('.related-products-slider', {
    direction: 'horizontal',
    spaceBetween: 20,
    slidesPerView: 4,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    speed: 600,
    preventClicks: false,
    preventClicksPropagation: false,
    breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 12 },
        768: { slidesPerView: 3, spaceBetween: 16 },
        992: { slidesPerView: 4, spaceBetween: 20 }
    }
});