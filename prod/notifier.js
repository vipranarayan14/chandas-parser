const notify = notifierBox => message => {

  notifierBox.innerHTML = `<b>{!} Error: </b>${message}`;
  notifierBox.style.display = 'block';

  const alertTimeOut = 5000;

  setTimeout(hide(notifierBox), alertTimeOut);

};

const hide = element => () => {

  element.innerHTML = '';
  element.style.display = 'none';

};

export const notifier = selector => {

  const notifierBox = document.querySelector(selector);

  return notify(notifierBox);

};
