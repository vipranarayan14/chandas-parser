export const createTable = data => {

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

export const makeChunks = (arr, chunkSize) => {

  const chunks = [];

  for (let i = 0, len = arr.length; i < len; i += chunkSize) {

    chunks.push(arr.slice(i, i + chunkSize).join(' , '));

  }

  return chunks;

};
