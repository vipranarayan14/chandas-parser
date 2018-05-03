export const initEventListeners = (input, options, handleOutput) => {

  input.addEventListener('keydown', e => {

    const enterKey = 13;

    if (e.keyCode === enterKey && input.value !== '') {

      handleOutput(
        input.value,
        options.ignoreLastLaghu
      );

    }

  });

};
