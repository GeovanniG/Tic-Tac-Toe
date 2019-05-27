import TicTacToe from "./TicTacToe.js";

(function start() {
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
				tic.hasPlayerWon(currentPlayer, i);
				if (tic.gameOver()) {
					celebrate(currentPlayer);
				}
			}
		});
	}
})();


function fillSquare(player, playersColors) {
	this.style.background = playersColors[player];
}

function celebrate(player) {
	console.log(`Player ${player} wins`);
}