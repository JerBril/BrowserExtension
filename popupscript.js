browser.runtime.sendMessage({ action: 'getData' }).then(response => {
  console.log(response);
  if (response.data) {
    const tableBody = document.getElementById('tableBody');

    response.data.forEach(pair => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = pair[0];

      const valueCell = document.createElement('td');
      valueCell.textContent = pair[1];

      row.appendChild(nameCell);
      row.appendChild(valueCell);

      tableBody.appendChild(row);
    });
  }
});