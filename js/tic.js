import TicTacToe from "./models/TicTacToe.js";
import * as ticView from "./views/ticView.js";

const tic = new TicTacToe(3, 3, 2, 3);
let currentPlayer = 0;
let dim = tic.rows * tic.cols;
let playersColors = ["lightgreen", "lightpink"];

for (let i = 0; i < dim; i++) {
	document.querySelectorAll("td")[i].addEventListener("click", function() {
		if (!tic.isSquareFilled(i) && !tic.gameOver()) {
			currentPlayer = tic.currentPlayer();
			tic.fillSquare(currentPlayer, i);
			ticView.fillSquare(this, currentPlayer, playersColors);
			if (tic.hasPlayerWon(currentPlayer, i)) {
				ticView.celebrate(currentPlayer, dim);
				tic.reset();
			} else if(tic.isTieGame()) {
				ticView.tie(dim);
				tic.reset();
			}
		}
	});
}
