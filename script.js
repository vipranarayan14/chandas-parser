const q = ['रामायणम्', 'रावणः', 'नम्रता', 'न निमग्नं', 'क्रन्दनम्', 'इव', 'सोऽपि', 'विदिताखिलशस्त्रसुधाजलधे', 'मुखान्निःसरन्ते गिरश्चापि चित्रम्', 'नं', 'न जानामि शब्दं न जानामि चार्थं'];

const inPut = document.querySelector('input');
const outPut = document.querySelector('.output');
const matras_outPut = outPut.querySelector('.matras > p');
const ganas_outPut = outPut.querySelector('.ganas > p');
const alert_box = document.querySelector('.alert-box');
const cp = new ChandasParser;

inPut.addEventListener('keydown', (e) => {

  if(e.keyCode === 13 && inPut.value !== '') {
  
    showMatras(inPut.value);
  }
});

function createTable(data) {

  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');
  const row = document.createElement('tr');
  const row2 = document.createElement('tr');
  
  data.names.forEach(function(cellData) {
  
    const cell = document.createElement('td');
 
      cell.appendChild(document.createTextNode(cellData));
    
    row.appendChild(cell);
  });
  
  data.ganas.forEach(function(rowData) {
  
    const cell = document.createElement('td');

    rowData.forEach(function(cellData, i, arr) {
    
      cellData = (i !== 2 && i !== arr.length-1) ? cellData + ',' : cellData;
      cell.appendChild(document.createTextNode(cellData));
    });
    
    row2.appendChild(cell);
  });
  
  tableBody.appendChild(row);
  tableBody.appendChild(row2);

  table.appendChild(tableBody);
  ganas_outPut.innerHTML = '';
  ganas_outPut.appendChild(table);
}

function showMatras(value) {

  const matras = cp.analyse(value).getMatras().result;
  const ganas = cp.getGanas().result;
  
  if (matras.length) {
  
    hideAlert();
    
    matras_outPut.innerHTML = matras;
    createTable(ganas);
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
