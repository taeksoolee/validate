/**
  * @param {{
*  onvalid(input: HTMLInputElement): void,
*  oninvalid(input: HTMLInputElement, type: 'pattern' | 'required'): void,
* }} events
*  */
function Validator(events) {
  const {
    onvalid,
    oninvalid,
  } = events;

  /**
     * @param  {...HTMLInputElement[]} inputs 
     */
  function validate(...inputs) {
    return inputs.reduce((valid, input) => {
      return this.check(input) && valid;
    }, true);
  }

  /**
   * set custom invalid message
   * @attr pattern
   * @attr aria-errormessage
   */
  function setErrorMessage(input) {
    if (input instanceof HTMLInputElement) {
      if (input.pattern) {
        const errormesage = input.getAttribute('aria-errormessage') || '';
        input.setCustomValidity(errormesage);
      }
    }
  }

  /**
     * @attr required
     * @attr pattern
     */
  function check (input) {
    if (input instanceof HTMLInputElement) {
      // input.validity.valueMissing is true if required and has no value
      if (input.validity.valueMissing) {
        oninvalid(input, 'required');
        return false;
      }

      if (input.validity.patternMismatch) {
        oninvalid(input, 'pattern');
        return false;
      }

      onvalid(input);
      return true;
    }
  }

  return {
    validate,
    setErrorMessage,
    check,
    handlers: {
      oninput(event) {
        check(event.target);
      },
      oninvalid(event) {
        setErrorMessage(event.target);
      }
    },
  }
}