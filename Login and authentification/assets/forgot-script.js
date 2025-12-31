document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgotForm');
  const emailVal = () => document.getElementById('email').value.trim();

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!emailVal()) return alert("Please enter your email.");

      sessionStorage.setItem('resetFlow', 'true');
      window.location.href = 'verify.html';
    });
  }
});
