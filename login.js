// --- نمایش هوشمند پیام «حساب پیدا نشد» (فعلاً شبیه‌سازی‌شده، بعداً به بک‌اند وصل می‌شه) ---
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const value = document.getElementById('phoneInput').value.trim();
    const alertBox = document.getElementById('accountAlert');

    // TODO: اینجا باید یه درخواست واقعی به سرور بفرستی تا چک کنه حساب وجود دارد یا نه
    // فعلاً فقط برای نمایش رفتار، اگه شماره خالی نبود، الرت رو نشون می‌دیم
    const accountExists = false; // این مقدار باید از پاسخ سرور بیاد

    if (!accountExists && value.length > 0) {
        alertBox.style.display = 'flex';
    } else {
        alertBox.style.display = 'none';
        // اینجا مسیر ورود موفق رو ادامه بده
    }
});