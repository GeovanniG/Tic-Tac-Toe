import Board from "Board";

class TicTacToe extends Board {
    constructor(rows, cols, adjacentSquaresNeededToWin) {
        super(rows, cols);
        this.adjacentSquaresNeededToWin = adjacentSquaresNeededToWin;
    }

    set adjacentSquaresNeededToWin(value) {
        if (!this.isValidInput(value)) {
            throw new Error("Enter a postive integer")
        }
        this._adjacentSquaresNeededToWin = value;
    }

    get adjacentSquaresNeededToWin() {
        return this._adjacentSquaresNeededToWin;
    }

    numOfHorizontalSquares(board, square) {
        const adjacentSquareDist = 1;
        const col = square%this.cols;
        let adjacentSquares = 1;
        
        // Count up all squares that are adjacent and to the right of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (board[possibleAdjacentSquare] && col < possibleAdjacentSquare%cols) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }
    
        // Count up all squares that are adjacent and to the left of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (board[possibleAdjacentSquare] && col > possibleAdjacentSquare%cols) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        } 
    
        return adjacentSquares;
    }

    numOfDiagnolSquares(board, square) {
        const adjacentSquareDist = this.cols+1;
        let adjacentSquares = 1;
        
        // Count up all squares that are adjacent and on the lower diagnol of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (board[possibleAdjacentSquare]) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }
    
        // Count up all squares that are adjacent and on the upper diagnol of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (board[possibleAdjacentSquare]) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        } 
    
        return adjacentSquares;
    }

    numOfCrossDiagnolSquares(board, square) {
        const adjacentSquareDist = this.cols-1;
        const col = square%this.cols;
        let adjacentSquares = 1;
        
        // Count up all squares that are adjacent and on the lower cross-diagnol of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (board[possibleAdjacentSquare]) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }
    
        // If square is on the last column, it has no adjacent squares on the upper cross-diagnol,
        // and the next while loop breaks down 
        if (col == this.cols-1) {
            return adjacentSquares;
        }
    
        // Count up all squares that are adjacent and on the upper cross-diagnol of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (board[possibleAdjacentSquare]) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        } 
    
        return adjacentSquares;
    }

    numOfVerticalSquares(board, square) {
        const adjacentSquareDist = this.cols;
        let adjacentSquares = 1;
        
        // Count up all squares that are adjacent and on top of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (board[possibleAdjacentSquare]) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }
    
        // Count up all squares that are adjacent and on the bottom of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (board[possibleAdjacentSquare]) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        } 
    
        return adjacentSquares;
    }

    fillSquare(board, square) {
        board[square] = true;
    }

    hasPlayerWon(board, square) {
        if ( numOfHorizontalSquares(board, square) >= this.adjacentSquaresNeededToWin ||
             numOfDiagnolSquares(board, square) >= this.adjacentSquaresNeededToWin ||
             numOfCrossDiagnolSquares(board, square) >= this.adjacentSquaresNeededToWin ||
             numOfVerticalSquares(board, square) >= this.adjacentSquaresNeededToWin ) {
            return true;
        }
        return false;
    }
}

export default TicTacToe;