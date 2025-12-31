document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirm');

  // Reusable toggle function
  const addToggle = (input) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    btn.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#6b7280;padding:4px 8px;';

    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(btn);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  };

  addToggle(passwordInput);
  addToggle(confirmInput);

  const showError = (el, msg) => {
    const err = document.createElement('div');
    err.className = 'error-msg';
    err.textContent = msg;
    err.style.cssText = 'color:#dc2626;font-size:12px;margin-top:4px;display:block;';
    el.parentElement.appendChild(err);
    el.style.borderColor = '#dc2626';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelectorAll('.error-msg').forEach(el => el.remove());
    document.querySelectorAll('.form-control').forEach(el => el.style.borderColor = '');

    const email = document.getElementById('email').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const pw = passwordInput.value;
    const confirm = confirmInput.value;
    let isValid = true;

    if (!email || !email.includes('@')) { showError(document.getElementById('email'), 'Invalid email'); isValid = false; }
    if (studentId.length < 6) { showError(document.getElementById('studentId'), 'ID too short'); isValid = false; }
    if (pw.length < 6) { showError(passwordInput, 'Password too short'); isValid = false; }
    if (pw !== confirm) { showError(confirmInput, 'Passwords do not match'); isValid = false; }

    if (isValid) window.location.href = 'verify.html';
  });
});
