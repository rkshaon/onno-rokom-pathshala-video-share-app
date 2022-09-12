function reportType() {
    let report_type = document.getElementById('report-type').value;
    let table_title_div = document.getElementById('table-title-div');
    let yearly_or_not_div = document.getElementById('yearly-or-not-div');
    let year_div = document.getElementById('year-div');
    let how_many_year_div = document.getElementById('how-many-year-div');
    let column_list_div = document.getElementById('column-list-div');
    let btn_div = document.getElementById('btn-div');

    if (report_type !== 'none' ) {
        table_title_div.style.display = 'block';
        table_title_div.focus();
        yearly_or_not_div.style.display = 'block';
        column_list_div.style.display = 'block';

        let yearly_or_not = document.getElementById('yearly-or-not').checked;
        let year_div = document.getElementById('year-div');

        if (yearly_or_not === true) {
            year_div.style.display = 'block';
        } else {
            year_div.style.display = 'none';
        }

        if (report_type !== 'daily') {
            yearly_or_not_div.style.display = 'none';
            year_div.style.display = 'none';
            how_many_year_div.style.display = 'block';
        } else if (report_type === 'daily') {
            how_many_year_div.style.display = 'none';
        }
    } else {
        table_title_div.style.display = 'none';
        yearly_or_not_div.style.display = 'none';
        year_div.style.display = 'none';
        how_many_year_div.style.display = 'none';
        column_list_div.style.display = 'none';
    }
}


function setCurrentYear() {
    let year = new Date().getFullYear();
    document.getElementById('year').value = year;
}


function yearlyOrNot() {    
    let yearly_or_not = document.getElementById('yearly-or-not').checked;
    let year_div = document.getElementById('year-div');

    if (yearly_or_not === true) {
        year_div.style.display = 'block';
        setCurrentYear();
    } else {
        year_div.style.display = 'none';
    }
}


function fileSelect() {
    document.getElementById('wrong-format-data').style.display = 'none';
    let file = document.getElementById("file-to-upload");

    let fr = new FileReader();
    fr.readAsText(file.files[0]);
    
    fr.onload = function() {
        let result = fr.result;
        let resultArray = result.split('\n');
        firstIndexArray = resultArray[0].split(',');

        if (firstIndexArray.length === 4 && firstIndexArray[0] === 'name' && firstIndexArray[1] === 'data_type' && firstIndexArray[2] === 'length' && firstIndexArray[3] === 'is_null') {
            resultArray.splice(0, 1);
            resultArray.splice((resultArray.length - 1), 1);

            let table = document.getElementById("column-list-table");
            let rowCount = document.getElementById("column-list-table").rows.length;
            let rowInsertPosition = rowCount - 1;
            let lastRowIndex = rowCount - 2;

            let lastColumnName = 'column-name-' + String(lastRowIndex);
            let lastColumnDataType = 'column-data-type-' + String(lastRowIndex);

            let lastColumnNameValue = document.getElementById(`${lastColumnName}`);
            let lastColumnDataTypeValue = document.getElementById(`${lastColumnDataType}`);

            if ((typeof lastColumnNameValue.value === 'string' && lastColumnNameValue.value.length === 0) || (typeof lastColumnDataTypeValue.value === 'string' && lastColumnDataTypeValue.value.length === 0)) {
                document.getElementById("column-list-table").deleteRow(lastRowIndex);
                rowInsertPosition = rowInsertPosition - 1;
            } else {
                let appendBtnRemoveName = 'append-button-' + String(rowInsertPosition-1);
                document.getElementById(`${appendBtnRemoveName}`).style.display = 'none';
            }

            let totalIteration = 1;

            for (let i = 1; i <= resultArray.length; i++) {
                let rowData = resultArray[i-1].split(',');
                
                let row = table.insertRow(rowInsertPosition);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                
                let cell1Data = '<input type="text" size="5" value="' + String(rowData[0]) + '"';
                cell1Data += ' id="column-name-' + String(rowInsertPosition) + '" name="column-name" >';
                let cell2Data = '<input type="text" size="5" value="' + String(rowData[1]) + '"';
                cell2Data += ' id="column-data-type-' + String(rowInsertPosition) + '" name="column-data-type" >';
                let cell3Data = '<input type="text" size="1" value="' + String(rowData[2]) + '" id="column-length-' + String(rowInsertPosition) + '" name="column-length" >';
                let cell4Data = '<input type="checkbox"';

                if (rowData[3].toLowerCase() === 'true') {
                    cell4Data += ' checked ';
                }

                cell4Data += ' id="column-is-null-' + String(rowInsertPosition) + '" name="column-is-null" >';

                let cell5Data = '<img src="static/icons/circle-minus-solid.svg" alt="minus" width="25" style="cursor: pointer;" onclick="removeFormTableRow(this)" >';
                if (totalIteration === resultArray.length) {
                    cell5Data += ' <img src="static/icons/circle-plus-solid.svg" alt="plus" width="25" style="cursor: pointer;" id="'
                    cell5Data += 'append-button-' + String(rowInsertPosition) + '" onclick="appendFormTableRow(' + String(rowInsertPosition) + ')" >';
                } else {
                }

                cell1.innerHTML = cell1Data;
                cell2.innerHTML = cell2Data;
                cell3.innerHTML = cell3Data;
                cell4.innerHTML = cell4Data;
                cell5.innerHTML = cell5Data;

                rowInsertPosition = rowInsertPosition + 1;
                totalIteration = totalIteration + 1;
            }            
        } else {
            document.getElementById('wrong-format-data').style.display = 'block';
            alert('Inappropiate data formate!');
        }
    }
}


function appendFormTableRow(num) {
    let rowCount = document.getElementById("column-list-table").rows.length;
    let rowInsertPosition = rowCount - 1;

    num = Number(num);
    nextNum = num + 1;

    let columnName = 'column-name-' + String(num);
    let columnDataType = 'column-data-type-' + String(num);

    let columnNameValue = document.getElementById(`${columnName}`);
    let columnDataTypeValue = document.getElementById(`${columnDataType}`);

    if ((typeof columnNameValue.value === 'string' && columnNameValue.value.length === 0) || (typeof columnDataTypeValue.value === 'string' && columnDataTypeValue.value.length === 0)) {
        alert('Fill up COLUMN NAME and DATA TYPE  both!');
    } else {
        let table = document.getElementById("column-list-table");
        let row = table.insertRow(rowInsertPosition);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        
        let nextColumnName = 'column-name-' + String(nextNum);
        let nextColumnDataType = 'column-data-type-' + String(nextNum);
        let nextAppendBtnName = 'append-button-' + String(nextNum);
        let appendBtnName = "append-button-" + String(num);

        let appendBtn = document.getElementById(`${appendBtnName}`);

        let cell1Data = '<input type="text" size="5"';
        cell1Data += ' class="column-name" name="column-name"';
        cell1Data += ' id="' + nextColumnName + '"';
        cell1Data += '>';

        let cell2Data = '<input type="text" size="5"'
        cell2Data += ' class=column-data-type name="column-data-type"';
        cell2Data += ' id="' + nextColumnDataType + '"';
        cell2Data += '>';

        let cell3Data = '<input type="text" size="1" name="column-length" id="column-length-' + String(nextNum) + '" >';
        let cell4Data = '<input type="checkbox" id="column-is-null-' + String(nextNum) + '" name="column-is-null" >';
        
        let cell5Data = '<img src="static/icons/circle-minus-solid.svg" alt="minus" width="25" style="cursor: pointer;" onclick="removeFormTableRow(this)" >';
        cell5Data += ' <img src="static/icons/circle-plus-solid.svg" alt="plus" width="25" style="cursor: pointer;" id="'
        cell5Data += nextAppendBtnName + '" onclick="appendFormTableRow(' + String(nextNum) + ')" >';
        
        cell1.innerHTML = cell1Data;
        cell2.innerHTML = cell2Data;
        cell3.innerHTML = cell3Data;
        cell4.innerHTML = cell4Data;
        cell5.innerHTML = cell5Data;
        
        appendBtn.style.display = 'none';
    }    
}


function removeFormTableRow(r) {
    let rowCount = document.getElementById("column-list-table").rows.length;

    if (rowCount > 3) {
        let i = r.parentNode.parentNode.rowIndex;
        document.getElementById("column-list-table").deleteRow(i);
    } else {
        alert('You can not remove last row!');
    }
}

