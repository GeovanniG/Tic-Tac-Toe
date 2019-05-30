import TicTacToe from "./models/TicTacToe.js";
import Form from "./models/Form.js";
import * as ticView from "./views/tictactoeView.js";
import * as formView from "./views/formView.js";
// import * as scoreView from "./views/scoreView.js";

let rows = 3;
let cols = 3;
let players = 2;
let adjacentSquaresNeededToWin = 3;
ticView.displayTable(rows, cols);
let tic = new TicTacToe(rows, cols, players, adjacentSquaresNeededToWin);
let currentPlayer = 0;
let playersColors = ["#90ee90", "#ffb6c1"];
let form = new Form();

document.querySelector(".settings-text").addEventListener("click", () => {
	formView.showSettings();
});

document.querySelector(".settings-text-icon").addEventListener("click", () => {
	formView.hideSettings();
});

document.querySelector("#players").addEventListener("change", () => {
	formView.displayColors(form.getNumOfPlayers());
});

document.querySelector(".settings-button").addEventListener("click", (e) => {
	e.preventDefault();
	playersColors = form.getPlayersColors();
	[rows, cols] = form.getGridSettings();
	players = form.getNumOfPlayers();
	adjacentSquaresNeededToWin = form.getAdjacentSquaresNeededToWin();
	gameSetup(rows, cols, players, adjacentSquaresNeededToWin, playersColors);
});

document.querySelector(".cancel-button").addEventListener("click", (e) => {
	// Need to create closure of global variables maybe 
	// make function so that reset-button can use as well

	e.preventDefault();	
	formView.displayNumOfPlayers(players);
	formView.displayColors(players, playersColors);
	formView.displayGridNums(rows, cols);
	// formView.displayWinningScore(winningScore);
	formView.displayAdjacentSquaresNeededToWin(adjacentSquaresNeededToWin);
});

document.querySelector(".reset-button").addEventListener("click", (e) => {
	e.preventDefault();	
	// formView.resetSettings();
	gameSetup();
});


//// Tic tac toe related
const gameSetup = (rows=3, cols=3, players=2, adjacentSquaresNeededToWin=3, playersColors=["#90ee90", "#ffb6c1"]) => {
	let tic = new TicTacToe(rows, cols, players, adjacentSquaresNeededToWin);
	let dim = tic.rows * tic.cols;
	// formView.displayColors(players);
	// formView.displayColors(form.getNumOfPlayers());
	formView.hideSettings();
	ticView.displayTable(rows, cols);
	for (let i = 0; i < dim; i++) {
		document.querySelectorAll("td")[i].addEventListener("click", function() {
			if (!tic.isSquareFilled(i) && !tic.gameOver()) {
				currentPlayer = tic.currentPlayer();
				tic.fillSquare(currentPlayer, i);
				ticView.fillSquare(this, currentPlayer, playersColors);
				if (tic.hasPlayerWon(currentPlayer, i)) {
					ticView.celebrate(currentPlayer, dim);
					// scoreView.displayPlayerScore(player, score.playerScore());
					tic.reset();
				} else if(tic.isTieGame()) {
					ticView.tie(dim);
					tic.reset();
				}
			}
		});
	}
}

gameSetup();