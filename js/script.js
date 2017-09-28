'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const table = new Table(document.querySelector('.field'));
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
        this.mouseLeave = this.mouseLeave.bind(this);
        this.showAllBtn = this.showAllBtn.bind(this);
        this.hideAllBtn = this.hideAllBtn.bind(this);
        this.changeStyleRowBtn = this.changeStyleRowBtn.bind(this);
        this.changeStyleColBtn = this.changeStyleColBtn.bind(this);
        this.showResetRowBtn = this.showResetRowBtn.bind(this);
        this.showResetColBtn = this.showResetColBtn.bind(this);
        this.hideResetRowBtn = this.hideResetRowBtn.bind(this);
        this.hideResetColBtn = this.hideResetColBtn.bind(this);
        this.deleteRowBtn = this.field.querySelector('button.field__btn-delete-row');
        this.deleteColBtn = this.field.querySelector('button.field__btn-delete-column');
        this.cellTarget = null;
        this.timer = 2000;
        this.hideTimer = 0;


        this.field.querySelector('button.field__btn-add-column').addEventListener('click', this.addCol);
        this.field.querySelector('button.field__btn-add-row').addEventListener('click', this.addRow);
        this.field.querySelector('button.field__btn-delete-row').addEventListener('click', this.delRow);
        this.field.querySelector('button.field__btn-delete-row').addEventListener('mouseover', this.showResetRowBtn);
        this.field.querySelector('button.field__btn-delete-row').addEventListener('mouseleave', this.hideResetRowBtn);
        this.field.querySelector('button.field__btn-delete-column').addEventListener('click', this.delColumn);
        this.field.querySelector('button.field__btn-delete-column').addEventListener('mouseover', this.showResetColBtn);
        this.field.querySelector('button.field__btn-delete-column').addEventListener('mouseleave', this.hideResetColBtn);
        this.table.addEventListener('mouseover', this.mouseOver);
        this.table.addEventListener('mouseleave', this.mouseLeave);
    }

    mouseOver(event) {
        if (event.target instanceof HTMLTableCellElement) {
            const cell = event.target;
            this.moveColButton(cell);
            this.moveRowButton(cell);
            this.catchCellRemoveTarget(cell);
        }
        this.showAllBtn();
    }

    mouseLeave() {
        this.hideTimer = setTimeout(
            this.hideAllBtn,
            this.timer
        );
    }

    showAllBtn() {
        this.deleteRowBtn.style.display = 'block';
        this.deleteColBtn.style.display = 'block';
    }

    hideAllBtn() {
        this.deleteRowBtn.style.display = 'none';
        this.deleteColBtn.style.display = 'none';
    }

    showResetColBtn() {
        this.deleteColBtn.style.display = 'block';
        this.deleteRowBtn.style.display = 'none';
        clearTimeout(this.hideTimer);
    }

    hideResetColBtn() {
        this.deleteColBtn.style.display = 'none';
    }

    showResetRowBtn() {
        this.deleteRowBtn.style.display = 'block';
        this.deleteColBtn.style.display = 'none';
        clearTimeout(this.hideTimer);
    }

    hideResetRowBtn() {
        this.deleteRowBtn.style.display = 'none';
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
        this.changeStyleRowBtn();
    }

    addCol() {
        let rows = this.table.tBodies[0].rows;
        for(let i = 0, l = rows.length; i < l; i++) {
            let newCell = rows[i].insertCell(-1);
            newCell.className = 'field__main-table elem';
        }
        this.changeStyleColBtn();
    }

    rowCount() {
        this.changeStyleRowBtn();
    }

    columnCount () {
        this.changeStyleColBtn();
    }
    changeStyleColBtn() {
        let cellCount = this.table.rows[0].cells.length;
        let styleResColumn = document.querySelector('button.field__btn-delete-column');
        if (cellCount > 1){
            styleResColumn.style.display = 'block';
        }else {
            styleResColumn.style.display = 'none';
        }
    }

    changeStyleRowBtn() {
        let lengthRowBtn = this.table.rows.length;
        const styleRowBtn = document.querySelector('button.field__btn-delete-row');
        if (lengthRowBtn > 1){
            styleRowBtn.style.display = 'block';
        }else {
            styleRowBtn.style.display = 'none';
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