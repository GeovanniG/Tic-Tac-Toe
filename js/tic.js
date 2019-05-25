// const table = document.querySelector("table");
// table.addEventListener("click", () => {
// 	// Obtain the closest nested td on area clicked
// 	const td = event.target;//.closest('td');
 
//  	// No nested td on area clicked will make td == null
// 	//if (!td) return;
	
// 	td.style.backgroundColor = "red";
// 	console.log(event.target);
// });

const tds = document.querySelectorAll("td");
const player1 = [];
const player2 = [];
const rows = 3;
const cols = 3;
const isSquareAvailable = Array(rows*cols).fill(true);
const adjacentSquaresNeededToWin = 3;

let isPlayer1Turn = true;
let isGameOver = false;

for (let i = 0; i < tds.length; i++) {
	tds[i].addEventListener("click", function () {
		if (isSquareAvailable[i] && !isGameOver) {
			isSquareAvailable[i] = false;
			fillSquare.call(this);
			isGameOver = checkForWinner(i);

			// Alternate between players
			isPlayer1Turn = !isPlayer1Turn;
		}
	});
}

function fillSquare() {
	if (isPlayer1Turn) {
		this.style.background = "lightgreen";
	} else {
		this.style.background ="lightpink";
	}
};

function checkForWinner(recentSquare) {
	let haveWinner = false;
	if (isPlayer1Turn) {
		haveWinner = hasPlayerWon(player1, recentSquare);
		player1.push(recentSquare);
	} else {
		haveWinner = hasPlayerWon(player2, recentSquare);
		player2.push(recentSquare);
	}
	return haveWinner;
};

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
	while (squares.includes(possibleAdjacentSquare) && col < possibleAdjacentSquare%cols) {
		adjacentSquares++;
		possibleAdjacentSquare += nextSquare;
	}

	// Count up all squares that are adjacent and to the left of recentSquare
	possibleAdjacentSquare = recentSquare - nextSquare;
	while (squares.includes(possibleAdjacentSquare) && col > possibleAdjacentSquare%cols) {
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
	while (squares.includes(possibleAdjacentSquare)) {
		adjacentSquares++;
		possibleAdjacentSquare += nextSquare;
	}

	// Count up all squares that are adjacent and on the upper diagnol of recentSquare
	possibleAdjacentSquare = recentSquare - nextSquare;
	while (squares.includes(possibleAdjacentSquare)) {
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
	while (squares.includes(possibleAdjacentSquare)) {
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
	while (squares.includes(possibleAdjacentSquare)) {
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
	while (squares.includes(possibleAdjacentSquare)) {
		adjacentSquares++;
		possibleAdjacentSquare += nextSquare;
	}

	// Count up all squares that are adjacent and on the bottom of recentSquare
	possibleAdjacentSquare = recentSquare - nextSquare;
	while (squares.includes(possibleAdjacentSquare)) {
		adjacentSquares++;
		possibleAdjacentSquare -= nextSquare;
	} 

	return adjacentSquares;
}