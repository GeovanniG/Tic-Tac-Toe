import Board from "./Board.js";

export default class TicTacToe extends Board {
    constructor(rows, cols, players, adjacentSquaresNeededToWin) {
        super(rows, cols);
        this.players = players;
        this.adjacentSquaresNeededToWin = adjacentSquaresNeededToWin;

        //Private variables
        // this._board = Array(this.rows*this.cols).fill({isSquareFilled: false}); // All elements reference the same object
        this._board = this.createInitialArray(this.rows*this.cols);
        this._scores = Array(this.players).fill(0);
        this._currentPlayer = 0;
        this._gameOver = false;
    }

    set players(value) {
        if (!this.isValidInput(value)) {
            throw new Error("Enter a postive integer");
        }
        this._players = value;
    }

    get players() {
        return this._players;
    }

    set adjacentSquaresNeededToWin(value) {
        if (!this.isValidInput(value)) {
            throw new Error("Enter a postive integer");
        }
        this._adjacentSquaresNeededToWin = value;
    }

    get adjacentSquaresNeededToWin() {
        return this._adjacentSquaresNeededToWin;
    }

    // Private methods
    createInitialArray(len) {
        let arr = []
        for (let i = 0; i < len; i++) {
          arr.push({isSquareFilled: false});
        }
        return arr;
    }
    
    isSquareFilledBy(player, square) {
        return (this._board[square].isSquareFilled && this._board[square].filledBy == player);
    }

    isSquareWithinBoard(square) {
        return (square >=0 && square < this.rows*this.cols);
    }

    isAdjacentSquareToTheRightOfSquare(square, adjacentSquare) {
        return square%this.cols < adjacentSquare%this.cols;
    }

    isAdjacentSquareToTheLeftOfSquare(square, adjacentSquare) {
        return square%this.cols > adjacentSquare%this.cols;
    }

    // Public methods
    currentPlayer() {
        return this._currentPlayer++%this.players;
    }

    scoreOfPlayer(player) {
        return this._scores[player];
    }

    playersScores() {
        let scores = [];
        for (let i = 0; i < this._players; i++) {
            scores[i] = this._scores[i] 
        }
        return scores;
    }

    resetScores() {
        this._scores = Array(this._players).fill(0);
    }

    gameOver() {
        return this._gameOver;
    }

    resetRound() {
        this._board = this.createInitialArray(this.rows*this.cols);
        this._currentPlayer = 0;
        this._gameOver = false;   
    }

    fillSquare(player, square) {
        if (this._board[square].isSquareFilled) {
            throw new Error("Square already filled");
        }
        this._board[square].isSquareFilled = true;
        this._board[square].filledBy = player;
    }

    isSquareFilled(square) {
        return this._board[square].isSquareFilled;
    }

    isTieGame() {
        for (let i = 0; i < this.rows * this.cols; i++) {
            if (!this._board[i].isSquareFilled) return false;
        }
        this._gameOver = true;
        return true;
    }

    numOfHorizontalSquares(player, square) {
        const adjacentSquareDist = 1;
        let adjacentSquares = 1;
        
        // Count up all squares that are adjacent and to the right of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare)
                && this.isAdjacentSquareToTheRightOfSquare(square, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }
    
        // Count up all squares that are adjacent and to the left of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare) 
                && this.isAdjacentSquareToTheLeftOfSquare(square, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        } 

        return adjacentSquares;
    }

    numOfDiagnolSquares(player, square) {
        const adjacentSquareDist = this.cols+1;
        let adjacentSquares = 1;
        
        // Count up all squares that are adjacent and on the lower diagnol of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare)
                && this.isAdjacentSquareToTheRightOfSquare(square, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }

        // Count up all squares that are adjacent and on the upper diagnol of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare)
                && this.isAdjacentSquareToTheLeftOfSquare(square, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        }
    
        return adjacentSquares;
    }

    numOfCrossDiagnolSquares(player, square) {
        const adjacentSquareDist = this.cols-1;
        let adjacentSquares = 1;

        // Count up all squares that are adjacent and on the lower cross-diagnol of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare) 
                && this.isAdjacentSquareToTheLeftOfSquare(square, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }
        
        // Count up all squares that are adjacent and on the upper cross-diagnol of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare)
                && this.isAdjacentSquareToTheRightOfSquare(square, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        }
        
        return adjacentSquares;
    }

    numOfVerticalSquares(player, square) {
        const adjacentSquareDist = this.cols;
        let adjacentSquares = 1;
        
        // Count up all squares that are adjacent and on bottom of square
        let possibleAdjacentSquare = square + adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare += adjacentSquareDist;
        }
    
        // Count up all squares that are adjacent and on the top of square
        possibleAdjacentSquare = square - adjacentSquareDist;
        while (this.isSquareWithinBoard(possibleAdjacentSquare) && this.isSquareFilledBy(player, possibleAdjacentSquare)) {
            adjacentSquares++;
            possibleAdjacentSquare -= adjacentSquareDist;
        } 
    
        return adjacentSquares;
    }

    // Enter the player and their most recent selected square
    // Determines whether player has won the game
    hasPlayerWon(player, square) {
        if (!this.isSquareFilledBy(player, square)) {
            throw new Error(`Square ${square} is not filled by Player ${player}`);
        }

        if (this.numOfHorizontalSquares(player, square) >= this.adjacentSquaresNeededToWin ||
            this.numOfDiagnolSquares(player, square) >= this.adjacentSquaresNeededToWin ||
            this.numOfCrossDiagnolSquares(player, square) >= this.adjacentSquaresNeededToWin ||
            this.numOfVerticalSquares(player, square) >= this.adjacentSquaresNeededToWin) {
                this._gameOver = true;
                this._scores[player]++;
                return true;
        }
        return false;
    }
}