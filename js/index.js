import TicTacToe from "./models/TicTacToe.js";
import Form from "./models/Form.js";
import * as ticView from "./views/tictactoeView.js";
import * as formView from "./views/formView.js";
import * as scoreView from "./views/scoreView.js";

let rows = 3;
let cols = 3;
let players = 2;
let adjacentSquaresNeededToWin = 3;
let gamesToWin = 1;
let tic;
let currentPlayer = 0;
let playersColors = ["#90ee90", "#ffb6c1"];
let form = new Form();

//// Form/Settings 
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
	gamesToWin = form.getGamesToWin(gamesToWin);
	adjacentSquaresNeededToWin = form.getAdjacentSquaresNeededToWin();
	scoreView.setGamesToWin(gamesToWin);

	gameSetup(rows, cols, players, adjacentSquaresNeededToWin, playersColors, gamesToWin);
});

document.querySelector(".cancel-button").addEventListener("click", (e) => {
	e.preventDefault();	
	formView.displayNumOfPlayers(players);
	formView.displayColors(players, playersColors);
	formView.displayGridNums(rows, cols);
	formView.displayGamesToWin(gamesToWin);
	formView.displayAdjacentSquaresNeededToWin(adjacentSquaresNeededToWin);
	scoreView.setGamesToWin(gamesToWin);
});


//// Score board 
document.querySelector(".reset-button").addEventListener("click", (e) => {
	e.preventDefault();	
	formView.displaySettings(players=2, rows=3, cols=3, playersColors=2, adjacentSquaresNeededToWin=3, gamesToWin=1);
	scoreView.setGamesToWin(1);
	gameSetup();
});

document.querySelector(".score-text").addEventListener("click", () => {
	scoreView.showScores();
});

document.querySelector(".score-text-icon").addEventListener("click", () => {
	scoreView.hideScores();
});


//// Tic tac toe
const gameSetup = (rows=3, cols=3, players=2, adjacentSquaresNeededToWin=3, playersColors=["#90ee90", "#ffb6c1"], gamesToWin=1) => {
	let hasPlayerWon = false;
	tic = new TicTacToe(rows, cols, players, adjacentSquaresNeededToWin);

	// Display the view components that can vary when settings are changed
	scoreView.setPlayersScores(tic.playersScores());
	scoreView.hideScores();
	formView.displayColors(form.getNumOfPlayers(), playersColors);
	formView.hideSettings();
	ticView.displayTable(rows, cols);

	let tds = document.querySelectorAll("td");
	for (let i = 0; i < tds.length; i++) {
		tds[i].addEventListener("click", function() {
			if (!tic.isSquareFilled(i) && !tic.gameOver()) {
				currentPlayer = tic.currentPlayer();
				tic.fillSquare(currentPlayer, i);
				ticView.fillSquare(this, currentPlayer, playersColors);
				hasPlayerWon = tic.hasPlayerWon(currentPlayer, i);
				if (hasPlayerWon && tic.scoreOfPlayer(currentPlayer) == gamesToWin) {
					scoreView.setPlayersScores(tic.playersScores());
					ticView.winner(currentPlayer);
				} else if (hasPlayerWon) {
					scoreView.setPlayersScores(tic.playersScores());
					ticView.celebrate(currentPlayer);
				} else if (tic.isTieGame()) {
					ticView.tie();
				}
			}
		});
	}

	let nextGame = document.querySelectorAll(".next-game-button");
	for (let i = 0; i < nextGame.length; i++) {
		nextGame[i].addEventListener("click", (e) => {
			e.preventDefault();
			ticView.resetRound();
			tic.resetRound();
		})
	}

	document.querySelector(".rematch-button").addEventListener("click", (e) => {
		e.preventDefault();
		ticView.resetRound();
		tic.resetRound();
		tic.resetScores();
		scoreView.setPlayersScores(tic.playersScores());
	});

	document.querySelector(".rematch-settings-button").addEventListener("click", (e) => {
		e.preventDefault();
		ticView.resetRound();
		formView.showSettings();
	});
}

gameSetup();