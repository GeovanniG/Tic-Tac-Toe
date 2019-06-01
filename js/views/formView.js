export const displayColors = (players, colors=['#90ee90', '#ffb6c1', '#778899', '#aad8e6']) => {
	let colorMarkup = '';

	for (let i = 0; i < players; i++) {
		colorMarkup += 
			`<div class="input-container color-container">
				<label for="color${i}">Color for player ${i}: </label>
				<input type="color" id="color${i}" placeholder="Select color" value=${colors[i]}>
			</div>`;
	}
	colorMarkup = 
		`<div class="all-colors-container">
			${colorMarkup}
		</div>`;

	let allColorsContainer = document.getElementsByClassName("all-colors-container")[0];
	allColorsContainer.parentNode.removeChild(allColorsContainer);
	document.querySelector(".players-container").insertAdjacentHTML("afterend", colorMarkup);
}

export const showSettings = () => {
	document.querySelector(".settings-container").style.top = `0px`;
	document.querySelector(".settings-text-icon").style.display = "inline-block";
}

export const hideSettings = () => {
	let settings = document.querySelector(".settings-container");
	settings.style.top = `-${document.querySelector(".form-container").offsetHeight}px`;
	document.querySelector(".settings-text-icon").style.display = "none";
}

export const displayNumOfPlayers = (players) => {
	document.getElementById("players").value = players;
}

export const displayGridNums = (rows, cols) => {
	document.getElementById("rows").value = rows;
	document.getElementById("cols").value = cols;
}

export const displayGamesToWin = (score) => {
	document.getElementById("winning").value = score;
}

export const displayAdjacentSquaresNeededToWin = (squares) => {
	document.getElementById("adj-squares").value = squares;
}

export const displaySettings = (players, rows, cols, adjacentSquaresNeededToWin, colors, score) => {
	displayNumOfPlayers(players);
	displayGridNums(rows, cols);
	displayColors(players, colors);
	displayAdjacentSquaresNeededToWin(adjacentSquaresNeededToWin);
	displayGamesToWin(score);
}