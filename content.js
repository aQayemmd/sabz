document.addEventListener('DOMContentLoaded', function () {

  /* ========== اعتبارسنجی فرم تماس ========== */

  var form = document.getElementById('contactForm');
  var successBox = document.getElementById('formSuccess');

  var messages = {
    fullName: 'لطفاً نام و نام خانوادگی خود را وارد کنید.',
    phone: 'شماره موبایل معتبر نیست.',
    email: 'ایمیل وارد شده معتبر نیست.',
    subject: 'لطفاً یک موضوع انتخاب کنید.',
    message: 'لطفاً متن پیام را وارد کنید.'
  };

  function setError(field, text) {
    var wrapper = field.closest('.form-field');
    var errorEl = form.querySelector('[data-error-for="' + field.name + '"]');
    if (text) {
      wrapper.classList.add('has-error');
      errorEl.textContent = text;
    } else {
      wrapper.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validatePhone(value) {
    var normalized = value.trim();
    return /^0?9\d{9}$/.test(normalized) || /^\+?989\d{9}$/.test(normalized);
  }

  function validateEmail(value) {
    if (!value) return true; // اختیاری است
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function validateForm() {
    var isValid = true;

    var fullName = form.fullName;
    if (!fullName.value.trim()) {
      setError(fullName, messages.fullName);
      isValid = false;
    } else {
      setError(fullName, '');
    }

    var phone = form.phone;
    if (!validatePhone(phone.value)) {
      setError(phone, messages.phone);
      isValid = false;
    } else {
      setError(phone, '');
    }

    var email = form.email;
    if (!validateEmail(email.value)) {
      setError(email, messages.email);
      isValid = false;
    } else {
      setError(email, '');
    }

    var subject = form.subject;
    if (!subject.value) {
      setError(subject, messages.subject);
      isValid = false;
    } else {
      setError(subject, '');
    }

    var message = form.message;
    if (!message.value.trim()) {
      setError(message, messages.message);
      isValid = false;
    } else {
      setError(message, '');
    }

    return isValid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    successBox.classList.remove('visible');

    if (!validateForm()) {
      return;
    }

    // در این نسخه نمایشی، فقط پیام موفقیت نشان داده می‌شود.
    // در پیاده‌سازی نهایی، اینجا داده‌ها به سرور ارسال می‌شود.
    successBox.classList.add('visible');
    form.reset();

    successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // پاک کردن خطا هنگام تایپ مجدد کاربر
  Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (field) {
    field.addEventListener('input', function () {
      setError(field, '');
    });
    field.addEventListener('change', function () {
      setError(field, '');
    });
  });

  /* ========== آکاردئون سوالات متداول ========== */

  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});