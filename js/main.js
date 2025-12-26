const modal = document.getElementById('modal');
const openBtn = document.getElementById('openForm');
const closeBtn = document.getElementById('closeForm');
const form = document.getElementById('contactForm');
const error = document.getElementById('error');

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

/* Mobile menu */
burger.onclick = () => {
  mobileMenu.classList.toggle('open');
};

mobileMenu.querySelectorAll('a').forEach(link => {
  link.onclick = () => mobileMenu.classList.remove('open');
});

/* Modal open */
openBtn.onclick = () => {
  modal.style.display = 'flex';
  let opacity = 0;

  function fadeIn() {
    opacity += 0.05;
    modal.style.opacity = opacity;
    if (opacity < 1) requestAnimationFrame(fadeIn);
  }

  fadeIn();
};

/* Modal close */
closeBtn.onclick = () => {
  modal.style.display = 'none';
  modal.style.opacity = 0;
};

/* Form submit */
form.onsubmit = async e => {
  e.preventDefault();
  error.textContent = '';

  const data = {
    name: form.name.value,
    email: form.email.value
  };

  localStorage.setItem('formData', JSON.stringify(data));

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error();

    alert('Заявка отправлена!');
    modal.style.display = 'none';
    modal.style.opacity = 0;
  } catch {
    error.textContent = 'Ошибка отправки формы';
  }
};

/* FAQ */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.onclick = () => {
    btn.parentElement.classList.toggle('open');
  };
});
