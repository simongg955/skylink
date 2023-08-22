    // GENERAR EXCEL 
    function ExporXLSX(tablaId, nombreArchivo) {

        let tableSelect = document.getElementById(tablaId);
        let table = tableSelect.cloneNode(true);

        //Si no hay registros para generar el excel, se muestra una aleta a el usuario 
        if (table.rows.length === 1) {
            alert('Lo siento, no hay registros para descargar el Excel.')
            return;
        }

        const rows = [];
        const headers = [];

        // Obtener los títulos de las columnas
        const headerRow = table.rows[0];
        for (let i = 0; i < headerRow.cells.length - 2; i++) {
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
        var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();

        const data = rows;
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Excel");
        const buffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([buffer], { type: 'application/octet-stream' }));
        link.download = nombreArchivo + fecha + '.xlsx';
        link.click();
    }
