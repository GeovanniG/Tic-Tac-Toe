export const displayColors = (numOfPlayers, colors=['#90ee90', '#ffb6c1', '#778899', '#aad8e6']) => {
	let colorMarkup = '';
	let form = document.querySelector(".form-container");
	// Make room for new colors
	form.removeChild(form.childNodes[2]);

	for (let i = 0; i < numOfPlayers; i++) {
		colorMarkup += 
			`<div class="input-container color-container">
				<label for="color${i}">Color for player ${i}: </label>
				<input type="color" id="color${i}" placeholder="Select color" value=${colors[i]}>
			</div>`;
	}
	colorMarkup = 
		`<div class="all-colors-cointainer">
			${colorMarkup}
		</div>`;
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

export const displayNumOfPlayers = (numOfPlayers) => {
	document.getElementById("players").value = numOfPlayers;
}

export const displayGridNums = (rows, cols) => {
	document.getElementById("rows").value = rows;
	document.getElementById("cols").value = cols;
}

export const displayWinningScore = (score) => {
	document.getElementById("winning").value = score;
}

export const displayAdjacentSquaresNeededToWin = (squares) => {
	document.getElementById("adj-squares").value = squares;
}