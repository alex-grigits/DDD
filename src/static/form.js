const initForm = ({ api }) => {
  const button = document.getElementById('getAllData');
  const output = document.getElementById('output');
  const radioButtons = document.querySelectorAll('input[name="service"]');
  let selectedService = radioButtons[0];

  const getAllData = (output) => async () => {
    try {
      for (const radioButton of radioButtons) {
        if (radioButton.checked) {
          selectedService = radioButton.value;
          break;
        }
      }
      const res = await api[selectedService].read();
      console.table(res);
      output.innerText = JSON.stringify(res, null, 4);
    } catch (error) {
      console.error(error);
    }
  };

  button.addEventListener('click', getAllData(output));
};

export { initForm };
