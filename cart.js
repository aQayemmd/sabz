document.addEventListener('DOMContentLoaded', function () {

  /*
    توضیح برای توسعه‌دهنده بک‌اند (ASP.NET):
    - این فایل فقط منطق نمایشی سمت کلاینت (محاسبه جمع‌ها و کنترل تعداد) را انجام می‌دهد.
    - هیچ درخواستی به سرور ارسال نمی‌شود؛ در صورت نیاز به ذخیره تغییرات سبد خرید،
      می‌توان داخل توابع changeQuantity و removeItem یک فراخوانی fetch/AJAX ساده اضافه کرد.
    - قیمت هر آیتم از attribute بومی data-price (عدد خام، تومان) خوانده می‌شود.
  */

  var itemsList = document.getElementById('cartItemsList');
  var emptyMessage = document.getElementById('emptyCartMessage');

  var summaryCount = document.getElementById('summaryCount');
  var summarySubtotal = document.getElementById('summarySubtotal');
  var summaryTotal = document.getElementById('summaryTotal');

  function formatPrice(number) {
    return number.toLocaleString('en-US') + ' تومان';
  }

  function getItems() {
    return Array.prototype.slice.call(itemsList.querySelectorAll('.cart-item'));
  }

  function recalculateCart() {
    var items = getItems();
    var totalQty = 0;
    var subtotal = 0;

    items.forEach(function (item) {
      var price = parseInt(item.getAttribute('data-price'), 10) || 0;
      var qtyInput = item.querySelector('.qty-input');
      var qty = parseInt(qtyInput.value, 10) || 1;

      var lineTotal = price * qty;
      var lineTotalEl = item.querySelector('[data-role="line-total"]');
      if (lineTotalEl) {
        lineTotalEl.textContent = formatPrice(lineTotal);
      }

      totalQty += qty;
      subtotal += lineTotal;
    });

    summaryCount.textContent = totalQty + ' عدد';
    summarySubtotal.textContent = formatPrice(subtotal);
    summaryTotal.textContent = formatPrice(subtotal);

    if (items.length === 0) {
      emptyMessage.classList.remove('hidden');
    } else {
      emptyMessage.classList.add('hidden');
    }
  }

  function changeQuantity(item, direction) {
    var qtyInput = item.querySelector('.qty-input');
    var currentQty = parseInt(qtyInput.value, 10) || 1;
    var newQty = currentQty + direction;

    if (newQty < 1) {
      newQty = 1;
    }

    qtyInput.value = newQty;
    item.setAttribute('data-qty', newQty);
    recalculateCart();
  }

  function removeItem(item) {
    item.parentNode.removeChild(item);
    recalculateCart();
  }

  itemsList.addEventListener('click', function (e) {
    var button = e.target.closest('button[data-action]');
    if (!button) return;

    var item = button.closest('.cart-item');
    var action = button.getAttribute('data-action');

    if (action === 'increase') {
      changeQuantity(item, 1);
    } else if (action === 'decrease') {
      changeQuantity(item, -1);
    } else if (action === 'remove') {
      removeItem(item);
    }
  });

  itemsList.addEventListener('change', function (e) {
    if (!e.target.classList.contains('qty-input')) return;

    var input = e.target;
    var value = parseInt(input.value, 10);

    if (!value || value < 1) {
      value = 1;
    }

    input.value = value;
    recalculateCart();
  });

  /* ========== پنجره راهنمای سفارش از طریق دایرکت ========== */

  var checkoutBtn = document.getElementById('checkoutBtn');
  var checkoutModal = document.getElementById('checkoutModal');
  var modalCloseBtn = document.getElementById('modalCloseBtn');
  var modalCancelBtn = document.getElementById('modalCancelBtn');

  function openModal() {
    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    checkoutModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  checkoutBtn.addEventListener('click', openModal);
  modalCloseBtn.addEventListener('click', closeModal);
  modalCancelBtn.addEventListener('click', closeModal);

  checkoutModal.addEventListener('click', function (e) {
    if (e.target === checkoutModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && checkoutModal.classList.contains('open')) {
      closeModal();
    }
  });

  /* محاسبه اولیه جمع‌ها هنگام بارگذاری صفحه */
  recalculateCart();

});