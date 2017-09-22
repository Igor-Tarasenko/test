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
        this.columnCount = this.columnCount.bind(this);
        this.rowCount = this.rowCount.bind(this);
        this.delRow = this.delRow.bind(this);
        this.delColumn = this.delColumn.bind(this);

        this.field.querySelector('button.add-column').onclick = this.addCol;
        this.field.querySelector('button.add-row').onclick = this.addRow;
        this.field.querySelector('button.delete-row').onclick = this.delRow;
        this.field.querySelector('button.delete-column').onclick = this.delColumn;
    }

    addRow() {
        const tbodyNode = this.table.lastChild;
        let newTr = tbodyNode.firstChild.cloneNode(true);
        tbodyNode.appendChild(newTr);
        this.rowCount();
    }

    addCol() {
        let rows = this.table.tBodies[0].rows;
        for(let i = 0, l = rows.length; i < l; i++) {
            let newCell = rows[i].insertCell(-1);
            newCell.className = 'block__main-table__table__elem';
        }
        this.columnCount ();
    }

    rowCount() {
        let lengthRowBtn = this.table.rows.length;
        console.log(lengthRowBtn);
        const styleRowBtn = document.querySelector('button.delete-row');
        if (lengthRowBtn > 4){
            styleRowBtn.style.display = 'block';
        }else {
            styleRowBtn.style.display = 'none';
        }
    }

    columnCount () {
        let cellCount = this.table.rows[0].cells.length;
        console.log(cellCount);
        let styleResColumn = document.querySelector('button.delete-column');
        if (cellCount > 4){
            styleResColumn.style.display = 'block';
        }else {
            styleResColumn.style.display = 'none';
        }
    }

    delRow () {
        // let i = r.parentNode.parentNode.rowIndex;
        this.table.deleteRow(-1);
        this.rowCount();
    }

    delColumn () {
        // var index = r.parentNode.parentNode.cellIndex;
        let rows = this.table.tBodies[0].rows;
        for (let i = 0, l = rows.length; i < l; i++) {
            let dellCell = rows[i].deleteCell(2);
        };
        this.columnCount ();
    }
}
