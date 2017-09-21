'use strict';
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button.add-column').onclick = function() {
        addColumn ()
    }
    document.querySelector('button.add-row').onclick = function() {
        addRow ();
    }
});

const rowNumbers = () => {
    let lengthRowBtn = table.rows.length;
    console.log(lengthRowBtn);
    const styleRowBtn = document.getElementsByClassName('row');
    if (lengthRowBtn > 4){
        for(let i = 0; i < styleRowBtn.length; i++) {
            styleRowBtn[i].style.display = 'block';
        }
    }else if (lengthRowBtn <= 4) {
        for(var i = 0; i < styleRowBtn.length; i++) {
            styleRowBtn[i].style.display = 'none'
        }
    }
};

const columnNumbers = () => {
    let cell = table.rows[1].cells.length - 1;
    console.log(cell);
    if (cell > 4){
        let styleResColumn = document.getElementsByClassName('reset-column');
        for(let i = 0; i < styleResColumn.length; i++) {
            styleResColumn[i].style.display = 'block'
        }
    }
};
const addRow = () => {
    const table = document.getElementById("table");
    let tbodyNode = table.lastChild;
    let tr = tbodyNode.firstChild;
    let newTr = tr.cloneNode(true);
    tbodyNode.appendChild(newTr);
    rowNumbers();
};

const addColumn = () => {
    const table = document.getElementById("table");
    let rows = table.tBodies[0].rows;
    let cell = table.rows[1].cells.length - 1;
    console.log(cell);
    for(let i = 0, l = rows.length; i < l; i++) {
        let newCell = rows[i].insertCell(-1);
        newCell.className = 'block__main-table__table__elem';
    };
    columnNumbers();
}
const delRow = (r) => {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("table").deleteRow(i);
    let lengthRowBtn = document.getElementById("table").rows.length;
    console.log(lengthRowBtn);
    if (lengthRowBtn <= 4) {
        let styleRowBtn = document.getElementsByClassName('row');
        for(let i = 0; i < styleRowBtn.length; i++) {
            styleRowBtn[i].style.display = 'none'
        }
    } else {
        let styleRowBtn = document.getElementsByClassName('row');
        for(let i = 0; i < styleRowBtn.length; i++) {
            styleRowBtn[i].style.display = 'block'
        }
    }
}