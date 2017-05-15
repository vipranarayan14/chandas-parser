const alert_box = document.querySelector('.alert-box');
const ignoreLastLaghuCB = document.querySelector('.ignoreLastLaghuCB');
const inPut = document.querySelector('.inPut');

const outPut = document.querySelector('.outPut');
const chandas_outPut = outPut.querySelector('.chandas > p');
const ganas_outPut = outPut.querySelector('.ganas > p');
const matras_outPut = outPut.querySelector('.matras > p');

const cp = new ChandasParser;

cp.init();

inPut.addEventListener('keydown', (e) => {

  if(e.keyCode === 13 && inPut.value !== '') {
  
    //console.log(cp.analyse(inPut.value).getMatras().result());
    if(ignoreLastLaghuCB.checked === true) {
        
      showChandasParserResult(inPut.value, true);
    } else {
    
      showChandasParserResult(inPut.value, false);
    }
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
  
  data.matrasGroups.forEach(function(rowData) {
  
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

function showChandasParserResult(value, ignoreLastLaghu) {

  const cpResult = cp.analyse(value)
                     .getMatras()
                     .getGanas(ignoreLastLaghu)
                     .getChandas()
                     .result(),
                     
        matras = cpResult.matras;
  
  if (matras.length) {
  
    if (alert_box.style.display === 'block') hideAlert();
    
    matras_outPut.innerHTML = matras;
    
    createTable(cpResult.ganas);
    
    chandas_outPut.innerHTML = cpResult.chandas;
    
    outPut.style.display = 'block';
    
  } else {
    
    outPut.style.display = 'none';
    showAlert('Please enter valid devanagari character(s) only.');
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
