const q = ['रामायणम्', 'रावणः', 'नम्रता', 'न निमग्नं', 'क्रन्दनम्', 'इव', 'सोऽपि', 'विदिताखिलशस्त्रसुधाजलधे', 'मुखान्निःसरन्ते गिरश्चापि चित्रम्', 'नं', 'न जानामि शब्दं न जानामि चार्थं'];

const inPut = document.querySelector('input');
const outPut = document.querySelector('.output');
const cp = new ChandasParser;

inPut.addEventListener('keydown', (e) => {
  if(e.keyCode === 13) {  
    outPut.innerHTML = 
    '<div style="padding: 15px;">The lakshana of ' + '"' + inPut.value + 
    '" is:<br>' + '<p style="font-size: 30px;">' + cp.getMatras(inPut.value) + '</p></div>';
  }
});
