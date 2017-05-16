const alert_box = document.querySelector('.alert-box');
const ignoreLastLaghuCB = document.querySelector('.ignoreLastLaghuCB');
const inPut = document.querySelector('.inPut');

const outPut = document.querySelector('.outPut');
const chandas_outPut = outPut.querySelector('.chandas > p');
const ganas_outPut = outPut.querySelector('.ganas > p');
const syllables_outPut = outPut.querySelector('.matras > p');

const cp = new ChandasParser;

cp.init();

inPut.addEventListener('keydown', (e) => {

  if(e.keyCode === 13 && inPut.value !== '') {
  
    //console.log(cp.getSyllables(inPut.value).getMatras().result());
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
  
  data.names.forEach((cellData) => {
  
    const cell = document.createElement('td');
 
      cell.appendChild(document.createTextNode(cellData));
    
    row.appendChild(cell);
  });
  
  data.matrasGroups.forEach((cellData) => {
  
    const cell = document.createElement('td');
 
      cell.appendChild(document.createTextNode(cellData));
    
    row2.appendChild(cell);
  });
  
  tableBody.appendChild(row);
  tableBody.appendChild(row2);

  table.appendChild(tableBody);
  ganas_outPut.innerHTML = '';
  ganas_outPut.appendChild(table);
}

function showChandasParserResult(value, ignoreLastLaghu) {

  const cpResult = cp.getSyllables(value)
                     .getMatras()
                     .getGanas(ignoreLastLaghu)
                     .getChandas()
                     .result(),
                     
        syllables = cpResult.syllables;
  
  if (syllables.length) {
  
    if (alert_box.style.display === 'block') hideAlert();
    
    syllables_outPut.innerHTML = syllables;
    
    createTable(cpResult.ganas);
    
    chandas_outPut.innerHTML = cpResult.chandas;
    
    outPut.style.display = 'block';
    
  } else {
    
    outPut.style.display = 'none';
    showAlert('Please enter proper devanagari character(s) only.');
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
