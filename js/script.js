'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const table = new Table(document.querySelector('.field'));
    const styleRowBtn = document.querySelector('button.delete-row');
    const styleColBtn = document.querySelector('button.delete-column')
    document.getElementById('table').addEventListener('mouseover', function() {
        styleRowBtn.style.opacity = '1';
        styleColBtn.style.opacity = '1';
    });
    styleRowBtn.addEventListener('mouseover', function() {
        styleRowBtn.style.opacity = '1';
    });
    styleColBtn.addEventListener('mouseover', function() {
        styleColBtn.style.opacity = '1';
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
        this.mouseOver = this.mouseOver.bind(this);
        this.deleteRowBtn = this.field.querySelector('button.delete-row');
        this.deleteColBtn = this.field.querySelector('button.delete-column');
        this.cellTarget = null;


        this.field.querySelector('button.add-column').addEventListener('click', this.addCol);
        this.field.querySelector('button.add-row').addEventListener('click', this.addRow);
        this.field.querySelector('button.delete-row').addEventListener('click', this.delRow);
        this.field.querySelector('button.delete-column').addEventListener('click', this.delColumn);
        this.table.addEventListener('mouseover', this.mouseOver);
    }

    mouseOver(event) {
        if (event.target instanceof HTMLTableCellElement) {
            const cell = event.target;
            this.moveColButton(cell);
            this.moveRowButton(cell);
            this.catchCellRemoveTarget(cell);
        }
    }

    moveColButton(cell) {
        this.deleteColBtn.style.left = cell.offsetLeft + 'px';
    }

    moveRowButton(cell) {
        this.deleteRowBtn.style.top = cell.offsetTop + 'px';
    }

    catchCellRemoveTarget(targetCell) {
        this.cellTarget = targetCell;
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
        const styleRowBtn = document.querySelector('button.delete-row');
        if (lengthRowBtn > 1){
            styleRowBtn.style.display = 'block';
        }else {
            styleRowBtn.style.display = 'none';
        }
    }

    columnCount () {
        let cellCount = this.table.rows[0].cells.length;
        let styleResColumn = document.querySelector('button.delete-column');
        if (cellCount > 1){
            styleResColumn.style.display = 'block';
        }else {
            styleResColumn.style.display = 'none';
        }
    }

    delRow () {
        this.cellTarget.parentElement.remove();
        this.rowCount();
    }

    delColumn () {
        let rows = this.table.tBodies[0].rows;
        let cell = this.cellTarget.parentElement.children;
        let collIndex = [].indexOf.call(cell, this.cellTarget);
        for (let i = 0, l = rows.length; i < l; i++) {
            let dellCell = rows[i].deleteCell(collIndex);
        };
        this.columnCount ();
    }
}