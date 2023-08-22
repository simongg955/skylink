// Generar excel todas las columnas de las tablas
function ExporXLSX(tablaId, nombreArchivo, idColumn) {        
			
    var tableSelect = document.getElementById(tablaId);
    let table = tableSelect.cloneNode(true);
    const rows = [];
    const headers = [];

    // Obtener los títulos de las columnas
    const headerRow = table.rows[0];
    for (let i = 0; i < headerRow.cells.length; i++) {
        const cell = headerRow.cells[i];
        headers.push(cell.textContent);
    }

    // Recorrer las filas de la tabla y obtener los valores de las celdas
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const rowData = {};

        for (let j = 0; j < row.cells.length; j++) {
            const cell = row.cells[j];
            rowData[headers[j]] = cell.textContent;
        }
   
        rows.push(rowData);
    }

    // Agregar el objeto de títulos de columnas al inicio del array de filas
    //rows.unshift(headers);

    let hoy = new Date();
    let hora = hoy.getHours() + '-' + hoy.getMinutes() + '-' + hoy.getSeconds();
    let fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
            let codigoArchivo = document.getElementById(idColumn).textContent.trim();

    const data = rows;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Remision");
    const buffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([buffer], { type: 'application/octet-stream' }));
    link.download = nombreArchivo + codigoArchivo + '-' + fecha + '-' + hora + '.xlsx';
    link.click();
}

