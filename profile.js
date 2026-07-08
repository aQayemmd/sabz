document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. Tab Switching (تغییر تب‌ها) ==========
    const menuItems = document.querySelectorAll('.menu-item:not(#logoutBtn)');
    const panels = document.querySelectorAll('.panel');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');

            // حذف active از همه منوها
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // حذف active از همه پنل‌ها
            panels.forEach(p => p.classList.remove('active'));
            const targetPanel = document.getElementById(target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // در موبایل اسکرول به محتوا
            if (window.innerWidth <= 992 && targetPanel) {
                targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ========== 2. Address Form Toggle (نمایش/مخفی کردن فرم آدرس) ==========
    const addAddressBtn = document.getElementById('addAddressBtn');
    const addressFormBox = document.getElementById('addressFormBox');
    const cancelAddressBtn = document.getElementById('cancelAddressBtn');
    const saveAddressBtn = document.getElementById('saveAddressBtn');

    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            addressFormBox.style.display = 'block';
            addAddressBtn.style.display = 'none';
        });
    }

    if (cancelAddressBtn) {
        cancelAddressBtn.addEventListener('click', () => {
            addressFormBox.style.display = 'none';
            if (addAddressBtn) {
                addAddressBtn.style.display = 'inline-flex';
            }
        });
    }

    if (saveAddressBtn) {
        saveAddressBtn.addEventListener('click', () => {
            // اینجا می‌تونی validation یا ارسال به بک‌اند رو اضافه کنی
            showToast('آدرس جدید با موفقیت ذخیره شد');
            addressFormBox.style.display = 'none';
            if (addAddressBtn) {
                addAddressBtn.style.display = 'inline-flex';
            }
            // پاک کردن فیلدها
            document.getElementById('addressTitle').value = '';
            document.getElementById('addressName').value = '';
            document.getElementById('addressPhone').value = '';
            document.getElementById('addressText').value = '';
        });
    }


    // ========== 3. Order Tracking Modal (مودال پیگیری سفارش) ==========
    const modal = document.getElementById('orderModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // خواندن دیتای سفارش‌ها از JSON در HTML
    let orders = [];
    const ordersDataScript = document.getElementById('ordersData');
    if (ordersDataScript) {
        try {
            orders = JSON.parse(ordersDataScript.textContent);
        } catch (e) {
            console.error('خطا در پارس کردن دیتای سفارش‌ها:', e);
        }
    }

    function openOrderModal(orderId) {
        const order = orders.find(o => o.id == orderId);
        if (!order) {
            console.warn('سفارش با شناسه', orderId, 'پیدا نشد');
            return;
        }

        // تنظیم شماره سفارش در عنوان مودال
        document.getElementById('modalOrderNumber').textContent = `#${order.id}`;

        // ایجاد Stepper بر اساس وضعیت سفارش
        const stepper = document.getElementById('trackingStepper');
        const stages = [
            { id: 'processing', label: 'تایید سفارش', icon: 'fa-check' },
            { id: 'shipped', label: 'خروج از مرکز', icon: 'fa-truck' },
            { id: 'delivered', label: 'تحویل نهایی', icon: 'fa-box-open' }
        ];

        let stepperHtml = '';
        let foundActive = false;

        stages.forEach(stage => {
            let stepClass = '';

            if (order.status === 'cancelled') {
                // اگر سفارش لغو شده، همه مراحل خاموش
                stepClass = '';
            } else if (order.status === stage.id) {
                stepClass = 'active';
                foundActive = true;
            } else if (!foundActive) {
                stepClass = 'completed';
            }

            stepperHtml += `
                <div class="step ${stepClass}">
                    <div class="step-icon">
                        <i class="fa-solid ${stage.icon || 'fa-check'}"></i>
                    </div>
                    <div class="step-label">${stage.label}</div>
                </div>
            `;
        });

        stepper.innerHTML = stepperHtml;

        // رندر لیست اقلام سفارش
        const itemsContainer = document.getElementById('modalItemsList');
        if (order.items && order.items.length > 0) {
            itemsContainer.innerHTML = order.items.map(item => `
                <div class="modal-item">
                    <span>${item.name}</span>
                    <span>${item.price} تومان</span>
                </div>
            `).join('');
        } else {
            itemsContainer.innerHTML = '<p style="text-align:center;color:#999;">اطلاعات اقلام موجود نیست</p>';
        }

        // نمایش مبلغ کل
        document.getElementById('modalOrderTotal').textContent = `مبلغ کل: ${order.total} تومان`;

        // نمایش مودال
        modal.classList.add('active');
    }

    // Event delegation برای دکمه‌های پیگیری (چون ممکنه تعدادشون زیاد باشه)
    document.addEventListener('click', (e) => {
        const trackBtn = e.target.closest('.track-btn');
        if (trackBtn) {
            const orderId = trackBtn.getAttribute('data-id');
            openOrderModal(orderId);
        }
    });

    // بستن مودال با کلیک روی دکمه close
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // بستن مودال با کلیک روی overlay
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }


    // ========== 4. Edit Info Form (ویرایش اطلاعات حساب) ==========
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // اینجا می‌تونی دیتا رو به بک‌اند بفرستی
            // const formData = new FormData(editForm);

            showToast('تغییرات با موفقیت ذخیره شد');
        });
    }


    // ========== 5. Change Password Form (تغییر رمز عبور) ==========
    const passwordForm = document.getElementById('passwordForm');
    const passMsg = document.getElementById('passMsg');

    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentPass = document.getElementById('currentPass').value.trim();
            const newPass = document.getElementById('newPass').value.trim();
            const confirmPass = document.getElementById('confirmPass').value.trim();

            // پاک کردن پیام قبلی
            passMsg.textContent = '';
            passMsg.className = 'form-msg';

            // اعتبارسنجی ساده
            if (!currentPass || !newPass || !confirmPass) {
                passMsg.textContent = 'لطفاً همه فیلدها را پر کنید';
                passMsg.classList.add('msg-error');
                return;
            }

            if (newPass.length < 6) {
                passMsg.textContent = 'رمز عبور جدید باید حداقل ۶ کاراکتر باشد';
                passMsg.classList.add('msg-error');
                return;
            }

            if (newPass !== confirmPass) {
                passMsg.textContent = 'رمز عبور جدید با تکرار آن مطابقت ندارد';
                passMsg.classList.add('msg-error');
                return;
            }

            // اگر همه چیز OK بود
            passMsg.textContent = 'رمز عبور با موفقیت تغییر کرد';
            passMsg.classList.add('msg-success');
            passwordForm.reset();

            // اینجا می‌تونی دیتا رو به بک‌اند POST کنی
        });
    }


    // ========== 6. Wishlist Actions (حذف از علاقه‌مندی‌ها و افزودن به سبد) ==========
    document.addEventListener('click', (e) => {
        // حذف از علاقه‌مندی
        const removeFavBtn = e.target.closest('.remove-fav');
        if (removeFavBtn) {
            const itemId = removeFavBtn.getAttribute('data-id');
            const card = removeFavBtn.closest('.wishlist-card');
            if (card && confirm('آیا از حذف این محصول از علاقه‌مندی‌ها اطمینان دارید؟')) {
                card.remove();
                showToast('محصول از علاقه‌مندی‌ها حذف شد');
                // اینجا می‌تونی به بک‌اند درخواست DELETE بزنی
            }
        }

        // افزودن به سبد خرید
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            const itemId = addToCartBtn.getAttribute('data-id');
            showToast('محصول به سبد خرید اضافه شد');
            // اینجا می‌تونی به بک‌اند POST کنی
        }
    });


    // ========== 7. Address Actions (ویرایش و حذف آدرس) ==========
    document.addEventListener('click', (e) => {
        // ویرایش آدرس
        const editAddrBtn = e.target.closest('.edit-address');
        if (editAddrBtn) {
            const addrId = editAddrBtn.getAttribute('data-id');
            showToast('در حال ویرایش آدرس #' + addrId);
            // اینجا می‌تونی فرم رو پر کنی یا مودالی باز کنی
        }

        // حذف آدرس
        const deleteAddrBtn = e.target.closest('.delete-address');
        if (deleteAddrBtn) {
            const addrId = deleteAddrBtn.getAttribute('data-id');
            const card = deleteAddrBtn.closest('.address-card');
            if (card && confirm('آیا از حذف این آدرس اطمینان دارید؟')) {
                card.remove();
                showToast('آدرس با موفقیت حذف شد');
                // اینجا می‌تونی به بک‌اند DELETE کنی
            }
        }
    });


    // ========== 8. Logout (خروج از حساب) ==========
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('آیا می‌خواهید از حساب خود خارج شوید؟')) {
                showToast('در حال خروج از حساب...');
                // اینجا می‌تونی به صفحه logout ریدایرکت کنی
                // setTimeout(() => { window.location.href = '/logout'; }, 1000);
            }
        });
    }


    // ========== 9. Toast Notification Utility ==========
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

});
