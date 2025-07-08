const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт для збереження даних
const formData = {
  email: '',
  message: '',
};

// ===== ВІДНОВЛЕННЯ ДАНИХ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ =====
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
}

// ===== ОБРОБКА ВВЕДЕННЯ ДАНИХ =====
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// ===== ОБРОБКА ВІДПРАВКИ ФОРМИ =====
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  // Очищення всього
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
});
