// Profile Setup - Optimized
document.addEventListener('DOMContentLoaded', () => {
  const get = (id) => document.getElementById(id);
  const userData = JSON.parse(localStorage.getItem('onboardingData') || '{}');

  // Restore
  if (userData.profile) {
    ['skillProficiency', 'availability', 'workType', 'hourlyRate', 'linkedin', 'github'].forEach(id => {
      if (get(id)) get(id).value = userData.profile[id] || '';
    });
  }

  // Handle File Display
  const fileInput = get('resume');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    document.querySelector('.file-upload-btn').textContent = file ? file.name : 'Click to upload';
  });

  // Handle Submit
  get('profileSetupForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Required fields
    const req = ['skillProficiency', 'availability', 'workType'];
    if (req.some(id => !get(id).value)) return alert('Please fill in all required fields');

    userData.profile = {
      skillProficiency: get('skillProficiency').value,
      availability: get('availability').value,
      workType: get('workType').value,
      hourlyRate: get('hourlyRate').value,
      linkedin: get('linkedin').value,
      github: get('github').value,
      resume: fileInput.files[0] ? fileInput.files[0].name : (userData.profile?.resume || null)
    };

    localStorage.setItem('onboardingData', JSON.stringify(userData));
    window.location.href = 'success.html';
  });
});

window.goBack = () => window.location.href = 'services.html';
window.skipForNow = () => window.location.href = 'success.html';
