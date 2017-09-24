'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const table = new Table(document.querySelector('.block'));
    const styleRowBtn = document.querySelector('button.delete-row');
    const styleColBtn = document.querySelector('button.delete-column')
    document.getElementById('table').addEventListener('mouseover', function() {
        styleRowBtn.style.background = '#d20505';
        styleRowBtn.style.opacity = '1';
        styleRowBtn.style.transition = '.4s'
        styleColBtn.style.opacity = '1';
        styleColBtn.style.background = '#d20505';
        styleColBtn.style.transition = '.4s'
    });
    styleRowBtn.addEventListener('mouseover', function() {
        styleRowBtn.style.opacity = '1';
        styleRowBtn.style.background = '#d45f68';
        styleRowBtn.style.transition = '.6s';
    });
    styleColBtn.addEventListener('mouseover', function() {
        styleColBtn.style.opacity = '1';
        styleColBtn.style.background = '#d45f68';
        styleColBtn.style.transition = '.6s';
    });
    styleRowBtn.addEventListener('mouseleave', function() {
        styleRowBtn.style.opacity = '0';
    });
    styleColBtn.addEventListener('mouseleave', function() {
        styleColBtn.style.opacity = '0';
    });
    document.getElementById('table').addEventListener('mouseleave', function() {
        styleRowBtn.style.opacity = '0';
        styleColBtn.style.opacity = '0';
    });
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
        // this.mouseOver = this.mouseOver.bind(this);

        this.field.querySelector('button.add-column').onclick = this.addCol;
        this.field.querySelector('button.add-row').onclick = this.addRow;
        this.field.querySelector('button.delete-row').onclick = this.delRow;
        this.field.querySelector('button.delete-column').onclick = this.delColumn;
        // this.table.addEventListener('mouseover', this.mouseOver);
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
        if (lengthRowBtn > 1){
            styleRowBtn.style.display = 'block';
        }else {
            styleRowBtn.style.display = 'none';
        }
    }

    columnCount () {
        let cellCount = this.table.rows[0].cells.length;
        console.log(cellCount);
        let styleResColumn = document.querySelector('button.delete-column');
        if (cellCount > 1){
            styleResColumn.style.display = 'block';
        }else {
            styleResColumn.style.display = 'none';
        }
    }

    delRow () {
        this.table.deleteRow(-1);
        this.rowCount();
    }

    delColumn () {
        let rows = this.table.tBodies[0].rows;
        for (let i = 0, l = rows.length; i < l; i++) {
            let dellCell = rows[i].deleteCell(-1);
        };
        this.columnCount ();
    }

    // mouseOver () {
    //     if (event.target instanceof HTMLTableCellElement) {
    //         const cell = event.target;
    //         this.moveColButton(cell);
    //         this.moveRowButton(cell);
    //     }
    // }
    //
    // moveRowRemoveButton(cell) {
    //     this.field.querySelector('button.delete-row').style.top = 'cell.offsetTop' + 'px';
    // }
}