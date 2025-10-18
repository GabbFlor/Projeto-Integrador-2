document.addEventListener('DOMContentLoaded', () => {
  const usuarioBtn = document.getElementById('usuarioBtn');
  const usuarioDropdown = document.getElementById('usuarioDropdown');

  if (!usuarioBtn || !usuarioDropdown) return;

  function setAria(open) {
    usuarioBtn.setAttribute('aria-expanded', String(open));
  }

  usuarioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    usuarioDropdown.classList.toggle('hidden');
    setAria(!usuarioDropdown.classList.contains('hidden'));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!usuarioDropdown.classList.contains('hidden')) {
      if (!usuarioBtn.contains(e.target) && !usuarioDropdown.contains(e.target)) {
        usuarioDropdown.classList.add('hidden');
        setAria(false);
      }
    }
  });

  // Optional: close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !usuarioDropdown.classList.contains('hidden')) {
      usuarioDropdown.classList.add('hidden');
      setAria(false);
    }
  });
});