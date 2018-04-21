import { vChandas } from 'vchandas';

const alertBox = document.querySelector('.alert-box');
const ignoreLastLaghuCB = document.querySelector('.ignoreLastLaghuCB');
const inPut = document.querySelector('.inPut');

const output = document.querySelector('.outPut');
const chandasTypeOutput = output.querySelector('.chandas-type > p');
const ganasCountOutput = output.querySelector('.ganas-count > p');
const syllablesCountOutput = output.querySelector('.syllables-count > p');
const chandasOutput = output.querySelector('.chandas > p');
const ganasOutput = output.querySelector('.ganas > p');

const vc = vChandas();

const createTable = data => {

  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');

  data.forEach(rowData => {

    const row = document.createElement('tr');

    rowData[1].forEach(cellData => {

      const cell = document.createElement('td');

      cell.appendChild(document.createTextNode(cellData));

      row.classList.add(rowData[0]);
      row.appendChild(cell);

    });

    tableBody.appendChild(row);

  });

  table.appendChild(tableBody);

  return table;

};

const showAlert = alertMsg => {

  alertBox.innerHTML = `<b>{!} Error: </b>${alertMsg}`;
  alertBox.style.display = 'block';

  const alertTimeOut = 5000;

  setTimeout(hideAlert, alertTimeOut);

};

const hideAlert = () => {

  alertBox.innerHTML = '';
  alertBox.style.display = 'none';

};

const getChandasDetails = allDetails => {

  const chandasDetails = allDetails.chandas;

  return (chandasDetails) ? chandasDetails : { name: 'Chandas not found.', type: '-' };

};

const getGanasCount = matras => {

  const ganasCount = Math.floor(matras.length / 3);
  const matrasCount = matras.length % 3;

  return [
    ganasCount,
    matrasCount
  ];

};

const makeChunks = (arr, chunkSize) => {

  const chunks = [];

  for (let i = 0, len = arr.length; i < len; i += chunkSize) {

    chunks.push(arr.slice(i, i + chunkSize).join(','));

  }

  return chunks;

};

const showOutput = allDetails => {

  const chandasDetails = getChandasDetails(allDetails);

  ganasCountOutput.innerHTML = getGanasCount(allDetails.matras);
  syllablesCountOutput.innerHTML = allDetails.syllables.length;

  chandasTypeOutput.innerHTML = chandasDetails.type;
  chandasOutput.innerHTML = chandasDetails.name;

  ganasOutput.innerHTML = '';
  ganasOutput.appendChild(createTable(
    [
      ['names', allDetails.ganas.ganas],
      ['matras', makeChunks(allDetails.matras, 3)],
      ['syllables', makeChunks(allDetails.syllables, 3)]
    ]
  ));

  output.style.display = 'block';

};

const handleOutput = (value, ignoreLastLaghu = false) => {

  const chandasDetails = vc(value, ignoreLastLaghu);

  if (chandasDetails.syllables.length) {

    showOutput(chandasDetails);

  } else {

    output.style.display = 'none';
    showAlert('Please enter proper devanagari character(s) only.');

  }

};

inPut.addEventListener('keydown', e => {

  const enterKey = 13;

  if (e.keyCode === enterKey && inPut.value !== '') {

    handleOutput(inPut.value, ignoreLastLaghuCB.checked);

  }

});
