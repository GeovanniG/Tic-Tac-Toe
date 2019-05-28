import TicTacToe from "./models/TicTacToe.js";


function start() {
	let tic = new TicTacToe(3, 3, 2, 3);
	let currentPlayer = 0;
	let dim = tic.rows * tic.cols;
	let playersColors = ["lightgreen", "lightpink"];

	for (let i = 0; i < dim; i++) {
		document.querySelectorAll("td")[i].addEventListener("click", function() {
			if (!tic.isSquareFilled(i) && !tic.gameOver()) {
				currentPlayer = tic.currentPlayer();
				tic.fillSquare(currentPlayer, i);
				fillSquare.call(this, currentPlayer, playersColors);
				if (tic.hasPlayerWon(currentPlayer, i)) {
					celebrate(currentPlayer, dim);
				} else if(tic.isTieGame()) {
					tie(dim);
				}
			}
		});
	}
}

function fillSquare(player, playersColors) {
	this.style.background = playersColors[player];
}

function celebrate(player, dim) {
	document.querySelector(".winner-container").style.display = "block";
	document.querySelector(".winner").textContent = player;
	document.querySelector(".reset").addEventListener("click", () => {
		reset(dim);
	});
}

function unfillAllSquares(dim) {
	for (let i = 0; i < dim; i++) {
		document.querySelectorAll("td")[i].style.background = "#F0F0F0";
	}
}

function tie(dim) {
	document.querySelector(".tie-container").style.display = "block";
	document.querySelectorAll(".reset")[1].addEventListener("click", () => {
		reset(dim);
	});
}

function reset(dim) {
	document.querySelector(".winner-container").style.display = "none";
	document.querySelector(".tie-container").style.display = "none";
	unfillAllSquares(dim);
	start();
}

start();
