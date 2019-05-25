"use strict";

// Dimensions of board
const rows = 3;
const cols = 3;
const dim = rows*cols;
// Board layout
const player1 = Array(dim).fill(false);
const player2 = Array(dim).fill(false);
const adjacentSquaresNeededToWin = 3;
// Initial conditions
let isPlayer1Turn = true;
let isGameOver = false;
let isSquareAvailable = false;

for (let i = 0; i < dim; i++) {
	document.querySelectorAll("td")[i].addEventListener("click", function () {
		isSquareAvailable = !(player1[i] || player2[i]);
		if (isSquareAvailable && !isGameOver) {
			fillSquare.call(this, i);
			isGameOver = checkForWinner(i);
			if (isGameOver) {
				celebrate();
			}
			// Alternate between players
			isPlayer1Turn = !isPlayer1Turn;
		}
	});
}

function fillSquare(recentSquare) {
	if (isPlayer1Turn) {
		this.style.background = "lightgreen";
		player1[recentSquare] = true;
	} else {
		this.style.background ="lightpink";
		player2[recentSquare] = true;
	}
};

function checkForWinner(recentSquare) {
	let haveWinner = false;
	if (isPlayer1Turn) {
		haveWinner = hasPlayerWon(player1, recentSquare);
	} else {
		haveWinner = hasPlayerWon(player2, recentSquare);
	}
	return haveWinner;
};

function celebrate() {
	if (isPlayer1Turn) {
		console.log(`Player 1 wins`);
	} else {
		console.log(`Player 2 wins`);
	}	
}

function hasPlayerWon(squares, recentSquare) {
	if (squares.length <= 1) return false;

	if ( numOfHorizontalSquares(squares, recentSquare) >= adjacentSquaresNeededToWin ||
		 numOfDiagnolSquares(squares, recentSquare) >= adjacentSquaresNeededToWin ||
		 numOfCrossDiagnolSquares(squares, recentSquare) >= adjacentSquaresNeededToWin ||
		 numOfVerticalSquares(squares, recentSquare) >= adjacentSquaresNeededToWin ) {
		return true;
	}
	
	return false;
}

function numOfHorizontalSquares(squares, recentSquare) {
	const nextSquare = 1;
	let adjacentSquares = 1;
	let col = recentSquare%cols;
	
	// Count up all squares that are adjacent and to the right of recentSquare
	let possibleAdjacentSquare = recentSquare + nextSquare;
	while (squares[possibleAdjacentSquare] && col < possibleAdjacentSquare%cols) {
		adjacentSquares++;
		possibleAdjacentSquare += nextSquare;
	}

	// Count up all squares that are adjacent and to the left of recentSquare
	possibleAdjacentSquare = recentSquare - nextSquare;
	while (squares[possibleAdjacentSquare] && col > possibleAdjacentSquare%cols) {
		adjacentSquares++;
		possibleAdjacentSquare -= nextSquare;
	} 

	return adjacentSquares;
}

function numOfDiagnolSquares(squares, recentSquare) {
	const nextSquare = cols+1;
	let adjacentSquares = 1;
	
	// Count up all squares that are adjacent and on the lower diagnol of recentSquare
	let possibleAdjacentSquare = recentSquare + nextSquare;
	while (squares[possibleAdjacentSquare]) {
		adjacentSquares++;
		possibleAdjacentSquare += nextSquare;
	}

	// Count up all squares that are adjacent and on the upper diagnol of recentSquare
	possibleAdjacentSquare = recentSquare - nextSquare;
	while (squares[possibleAdjacentSquare]) {
		adjacentSquares++;
		possibleAdjacentSquare -= nextSquare;
	} 

	return adjacentSquares;
}

function numOfCrossDiagnolSquares(squares, recentSquare) {
	const nextSquare = cols-1;
	let adjacentSquares = 1;
	let col = recentSquare%cols;
	
	// Count up all squares that are adjacent and on the lower cross-diagnol of recentSquare
	let possibleAdjacentSquare = recentSquare + nextSquare;
	while (squares[possibleAdjacentSquare]) {
		adjacentSquares++;
		possibleAdjacentSquare += nextSquare;
	}

	// If recentSquare if on the last column, it has no adjacent squares on the upper cross-diagnol,
	// and the next while loop breaks down 
	if (col == cols-1) {
		return adjacentSquares;
	}

	// Count up all squares that are adjacent and on the upper cross-diagnol of recentSquare
	possibleAdjacentSquare = recentSquare - nextSquare;
	while (squares[possibleAdjacentSquare]) {
		adjacentSquares++;
		possibleAdjacentSquare -= nextSquare;
	} 

	return adjacentSquares;
}

function numOfVerticalSquares(squares, recentSquare) {
	const nextSquare = cols;
	let adjacentSquares = 1;
	
	// Count up all squares that are adjacent and on top of recentSquare
	let possibleAdjacentSquare = recentSquare + nextSquare;
	while (squares[possibleAdjacentSquare]) {
		adjacentSquares++;
		possibleAdjacentSquare += nextSquare;
	}

	// Count up all squares that are adjacent and on the bottom of recentSquare
	possibleAdjacentSquare = recentSquare - nextSquare;
	while (squares[possibleAdjacentSquare]) {
		adjacentSquares++;
		possibleAdjacentSquare -= nextSquare;
	} 

	return adjacentSquares;
}