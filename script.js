const q = ['रामायणम्', 'रावणः', 'नम्रता', 'न निमग्नं', 'क्रन्दनम्', 'इव', 'सोऽपि', 'विदिताखिलशस्त्रसुधाजलधे', 'मुखान्निःसरन्ते गिरश्चापि चित्रम्', 'नं', 'न जानामि शब्दं न जानामि चार्थं'];

const inPut = document.querySelector('input');
const outPut = document.querySelector('.output');
const matras_outPut = outPut.querySelector('.matras > p');
const alert_box = document.querySelector('.alert-box');
const cp = new ChandasParser;

inPut.addEventListener('keydown', (e) => {
  if(e.keyCode === 13 && inPut.value !== '') {
    showMatras(inPut.value);
  }
});

function showMatras(value) {

  const matras = cp.getMatras(value);
    
    if (matras.length) {
    
      hideAlert();
    
      matras_outPut.innerHTML = matras;
      outPut.style.display = 'block';
      
    } else {
      
      outPut.style.display = 'none';
      showAlert('Please enter valid character(s) only.');
    }
};

function showAlert(alertMsg) {
  
  alert_box.innerHTML = '<b>{!} Error: </b>' + alertMsg;
  alert_box.style.display = 'block';
  
  setTimeout(hideAlert, 5000);
};

function hideAlert() {

  alert_box.innerHTML = '';
  alert_box.style.display = 'none';
};
