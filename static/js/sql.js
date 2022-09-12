
function getDataList() {
    let rowDataList = [];

    let columnNameDataList = document.getElementsByName('column-name');
    let columnDataTypeList = document.getElementsByName('column-data-type');
    let columnLengthList = document.getElementsByName('column-length');
    let columnIsNullList = document.getElementsByName('column-is-null');
    
    for (let i = 0; i < columnNameDataList.length; i++) {
        let columnIdName = columnNameDataList[i].id;
        let columnDataTypeIdName = columnDataTypeList[i].id;
        let columnLengthIdName = columnLengthList[i].id;
        let columnIsNullIdName = columnIsNullList[i].id;
        
        let name = document.getElementById(`${columnIdName}`).value;
        let dataType = document.getElementById(`${columnDataTypeIdName}`).value;
        let dataLength = document.getElementById(`${columnLengthIdName}`).value;
        let isNull = document.getElementById(`${columnIsNullIdName}`).checked;

        let tempData = {
            'name': name,
            'data_type': dataType,
            'length': dataLength,
            'is_null': isNull
        };

        rowDataList.push(tempData);
    }
    
    return rowDataList;
}


function getAssociateData() {    
    let reportTableType = document.getElementById('report-type');
    let tableTitle = document.getElementById('table-title');
    let isYearActive = document.getElementById('yearly-or-not');
    
    let associateData = {
        'table_type': reportTableType.value,
        'table_title': tableTitle.value
    };

    if (isYearActive.checked) {
        associateData['year'] = document.getElementById('year').value;
    } else {
        associateData['how_many_year'] = document.getElementById('how-many-year').value;
    }
    
    return associateData;
}


function generateSQL(associateData, rowDataList) {
    sql = 'CREATE TABLE ' + String(associateData['table_type']);
    sql += '_report_' + String(associateData['table_title']);
    
    if ('year' in associateData) {
        sql += '_' + String(associateData['year']);
    }

    sql += '(';
    
    if (associateData['table_type'] === 'daily') {
        let year = null;

        if ('year' in associateData) {
            year = String(associateData['year']);
        } else {
            let currentDate = new Date();
            year = currentDate.getFullYear();
        }
        
        let firstDateString = "January 1, " + String(year);
        let lastDateString = "December 31, " + String(year);
        let firstDate = new Date(firstDateString);
        let lastDate = new Date(lastDateString);
        
        for (let start = firstDate; start <= lastDate; start.setDate(start.getDate() + 1)) {
            rowDataList.push({
                'name': 'date_' + String(start.getFullYear()) + '_' + String(start.getMonth() + 1) + '_' + String(start.getDate()),
                'data_type': 'TEXT',
                'length': '',
                'is_null': true
            });
        }
    } else if (associateData['table_type'] == 'weekly') {
        // console.log('weekly-table-selected');
        let totalCount = document.getElementById('how-many-year').value;
        let weekList = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
            '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33',
            '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
            '50', '51', '52'
        ];
        let currentYear = new Date().getFullYear();

        for (let i = 1; i <= totalCount; i++) {
            weekList.forEach(element => {
                rowDataList.push({
                    'name': 'week_' + String(currentYear) + '_' + element,
                    'data_type': 'TEXT',
                    'length': '',
                    'is_null': true
                });
            });

            currentYear += 1;
        }
    } else if (associateData['table_type'] == 'monthly') {
        let totalCount = document.getElementById('how-many-year').value;
        let monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        let currentYear = new Date().getFullYear();

        for (let i = 1; i <= totalCount; i++) {
            monthList.forEach(element => {
                rowDataList.push({
                    'name': 'month_' + String(currentYear) + '_' + element,
                    'data_type': 'TEXT',
                    'length': '',
                    'is_null': true
                });
            });

            currentYear += 1;
        }
    } else if (associateData['table_type'] == 'yearly') {
        let totalCount = document.getElementById('how-many-year').value;
        let currentYear = new Date().getFullYear();

        for (let i = 1; i <= totalCount; i++) {
            rowDataList.push({
                'name': 'year_' + String(currentYear),
                'data_type': 'TEXT',
                'length': '',
                'is_null': true
            });

            currentYear += 1;
        }
    }

    let rowDataLength = rowDataList.length;
    let index = 1;

    rowDataList.forEach(element => {
        sql += '\n';
        sql += String(element['name']) + ' ' + String(element['data_type']);

        if (element['data_type'] != 'boolean' && element['data_type'].toLowerCase() != 'text' && element['data_type'].toLowerCase() != 'timestamp') {
            sql += '(' + String(element['length']) + ')';
        }

        if (element['is_null'] === false) {
            sql += ' NOT NULL'
        }

        if (index != rowDataLength) {
            sql += ',';
        }

        index += 1;

        
    });

    sql += ');';

    return sql;
}


function activateAssociatedButtons() {
    // document.getElementById('copy-to-clipboard-btn').style.pointerEvents = 'auto';
    // document.getElementById('copy-to-clipboard-btn').classList.remove('btn-secondary');
    // document.getElementById('copy-to-clipboard-btn').classList.add('btn-primary');
}


function processData() {
    let associateData = getAssociateData();
    let rowDataList = getDataList();
    let sql = generateSQL(associateData, rowDataList);

    document.getElementById('sql').innerHTML = sql;
    
    activateAssociatedButtons();
}
