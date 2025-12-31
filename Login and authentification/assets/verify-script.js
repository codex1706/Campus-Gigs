document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.otp-input');
  const form = document.getElementById('verifyForm');
  const timerEl = document.getElementById('timer');
  const resendBtn = document.getElementById('resendBtn');
  let timeLeft = 60;

  // Auto-focus and navigation logic
  inputs.forEach((input, i) => {
    input.addEventListener('input', (e) => {
      if (e.target.value && i < inputs.length - 1) inputs[i + 1].focus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && i > 0) inputs[i - 1].focus();
    });

    input.addEventListener('keypress', (e) => !/[0-9]/.test(e.key) && e.preventDefault());
  });

  // Timer logic
  const startTimer = () => {
    timeLeft = 60;
    resendBtn.classList.add('disabled');
    resendBtn.style.pointerEvents = 'none';

    const interval = setInterval(() => {
      timerEl.textContent = --timeLeft;
      if (timeLeft <= 0) {
        clearInterval(interval);
        resendBtn.classList.remove('disabled');
        resendBtn.style.pointerEvents = 'auto';
      }
    }, 1000);
  };

  resendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (resendBtn.classList.contains('disabled')) return;

    alert('OTP resent!');
    inputs.forEach(inpt => inpt.value = '');
    inputs[0].focus();
    startTimer();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const otp = Array.from(inputs).map(i => i.value).join('');

    if (otp.length !== 6) return alert('Enter full 6-digit code');

    const isReset = sessionStorage.getItem('resetFlow') === 'true';
    if (!isReset) alert('Account Verified!');
    window.location.href = isReset ? 'password-reset.html' : 'login.html';
  });

  startTimer();
});
