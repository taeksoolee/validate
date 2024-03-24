const validator = Validator({
  oninvalid(input, type) {
    input.setAttribute('aria-invalid', 'true');
    if (type) {
      const alert = input.parentElement.querySelector('*[role=alert]');

      if (type === 'required') {
        alert.innerHTML = '필수 값 입니다.';
      } else if (type === 'pattern') {
        alert.innerHTML = input.getAttribute('aria-errormessage');
      }
    }
  },
  onvalid(input) {
    input.setAttribute('aria-invalid', 'false');
    const alert = input.parentElement.querySelector('*[role=alert]');
    alert.innerHTML = '';
  }
});

const onSubmit = (event) => {
  event.preventDefault();
  const form = event.target;

  if (!validator.validate(...form.querySelectorAll('input'))) {
    return;
  }

  /**
   * Example
   */
  const alert = form.querySelector('.alert');
  alert.setAttribute('aria-hidden', 'true');

  if (!(
    form['username'].value === '11111'
    && form['password'].value === '11111'
  )) {
    alert.setAttribute('aria-hidden', 'false');
    alert.innerHTML = '유효하지 않은 인증정보 입니다.'
    return;
  }


  const dialog = document.querySelector('dialog');
  dialog.querySelector('p').innerHTML = '인증에 성공했습니다. ✅';
  dialog.showModal();
}