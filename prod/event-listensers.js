export const initEventListeners = (input, handleOutput) => {

  const ignoreLastLaghuCB = document.querySelector('.ignoreLastLaghuCB');

  input.addEventListener('keydown', e => {

    const enterKey = 13;

    if (e.keyCode === enterKey && input.value !== '') {

      handleOutput(input.value, ignoreLastLaghuCB.checked);

    }

  });

};
