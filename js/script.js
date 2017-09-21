'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const table = new Table(document.querySelector('.block'));
});

class Table {
    constructor(field){
        this.field = field;
        this.table = field.querySelector('#table');
        this.addRow = this.addRow.bind(this);
        this.addCol = this.addCol.bind(this);

        this.field.querySelector('button.add-column').onclick = this.addCol;
        this.field.querySelector('button.add-row').onclick = this.addRow;
    }

    addRow() {
        const tbodyNode = this.table.lastChild;
        let newTr = tbodyNode.firstChild.cloneNode(true);
        tbodyNode.appendChild(newTr);
        rowCount();
    }

    addCol() {
        let rows = this.table.tBodies[0].rows;
        let cell = this.table.rows[1].cells.length - 1;
        console.log(cell);
        for(let i = 0, l = rows.length; i < l; i++) {
            let newCell = rows[i].insertCell(-1);
            newCell.className = 'block__main-table__table__elem';
        }
        columnCount ();
    }

    rowCount() {
        let lengthRowBtn = this.table.rows.length;
        console.log(lengthRowBtn);
        const styleRowBtn = document.getElementsByClassName('row');
        if (lengthRowBtn > 4){
            for(let i = 0; i < styleRowBtn.length; i++) {
                styleRowBtn[i].style.display = 'block';
            }
        }else if (lengthRowBtn <= 4) {
            for(let i = 0; i < styleRowBtn.length; i++) {
                styleRowBtn[i].style.display = 'none'
            }
        }
    }

    columnCount () {
        let cellCount = this.table.rows[1].cells.length - 1;
        console.log(cellCount);
        if (cellCount > 4){
            let styleResColumn = document.getElementsByClassName('reset-column');
            for(let i = 0; i < styleResColumn.length; i++) {
                styleResColumn[i].style.display = 'block'
            }
        }
    }
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