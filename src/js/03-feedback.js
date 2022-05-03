const throttle = require('lodash.throttle');
const formEl = document.querySelector('.feedback-form');

const storage = {
  addItem(key, value) {
    const result = JSON.stringify(value);
    localStorage.setItem(key, result);
  },

  getItem(key) {
    try {
      const payload = localStorage.getItem(key);
      return JSON.parse(payload);
    } catch (error) {
      console.error('Error parse');
    }
  },
};

formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onSubmitForm);
addEventListener('DOMContentLoaded', onPageInit);

function onInputChange() {
  const formData = {
    email: formEl.elements.email.value,
    message: formEl.elements.message.value,
  };
  storage.addItem('feedback-form-state', formData);
}

function onSubmitForm(e) {
  e.preventDefault();
  const formData = {
    email: formEl.elements.email.value,
    message: formEl.elements.message.value,
  };
  console.log(formData);
  localStorage.clear();
  formEl.reset();
}

function onPageInit() {
  if (localStorage.getItem('feedback-form-state')) {
    const formData = storage.getItem('feedback-form-state');
    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  }
}
