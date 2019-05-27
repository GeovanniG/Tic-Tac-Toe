export default class Board {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }
    
    set rows(value) {
        if (!this.isValidInput(value)) {
            throw new Error("rows must be a postive integer");
        }
        this._rows = value;
    }
    
    get rows() {
        return this._rows;
    }
    
    set cols(value) {
        if (!this.isValidInput(value)) {
            throw new Error("cols must be a postive integer");
        }
        this._cols = value;
    }
    
    get cols() {
        return this._cols;
    }

    isValidInput(value) {
        return Number.isInteger(value) && value >= 1;
    }
}