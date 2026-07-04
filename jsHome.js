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

  // اسکریپت برای باز و بسته شدن منوی دسته‌بندی‌ها در حالت موبایل
  const deptToggle = document.getElementById('deptToggle');
  const deptList = document.getElementById('deptList');

  deptToggle.addEventListener('click', () => {
    // فقط در صورتی که عرض صفحه از 991 پیکسل کمتر باشد (حالت موبایل) عمل کند
    if (window.innerWidth <= 991) {
      deptList.classList.toggle('active');
    }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
  
  var categorySwiper = new Swiper(".categorySwiper", {
    slidesPerView: 1, 
    spaceBetween: 20, 
    loop: true, /* اضافه شدن قابلیت چرخش بی‌نهایت */
    
    /* اضافه شدن حرکت خودکار */
    autoplay: {
      delay: 3000, /* هر ۳ ثانیه یک اسلاید رد می‌شود */
      disableOnInteraction: false, /* با کلیک کاربر، حرکت خودکار متوقف نمی‌شود */
    },
    
    // دکمه‌های ناوبری (کلیک چپ و راست)
    navigation: {
      nextEl: ".category-btn-next",
      prevEl: ".category-btn-prev",
    },
    
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 4, 
        spaceBetween: 30,
      },
    },
  });

});
