export const fillSquare = (td, player, playersColors) => {
	td.style.background = playersColors[player];
}

export const celebrate = (player, dim) => {
	document.querySelector(".winner-container").style.display = "block";
	document.querySelector(".winner").textContent = player;
	// document.querySelector(".next-game-button").addEventListener("click", (e) => {
	// 	e.preventDefault();
	// 	reset(dim);
	// });
}

export const winner = player => {
	document.querySelector(".rematch-container").style.display = "block";
	document.querySelector(".overall-winner").textContent = player;
}

export const unfillAllSquares = () => {
	const tds = document.querySelectorAll("td");
	for (let i = 0; i < tds.length; i++) {
		tds[i].style.background = "#f0f0f0";
	}
}

export const tie = () => {
	document.querySelector(".tie-container").style.display = "block";
	// document.querySelectorAll(".next-game-button")[1].addEventListener("click", (e) => {
	// 	e.preventDefault();
	// 	reset(dim);
	// });
}

export const resetRound = () => {
	document.querySelector(".winner-container").style.display = "none";
	document.querySelector(".tie-container").style.display = "none";
	document.querySelector(".rematch-container").style.display = "none";
	unfillAllSquares();
}

export const displayTable = (rows, cols) => {
	const markup = createTable(rows, cols);
	let tableContainer = document.querySelector(".table-container");
	tableContainer.removeChild(tableContainer.childNodes[2]);
	tableContainer.insertAdjacentHTML("beforeend", markup);
}

const createTable = (rows, cols) => {
	let tds = '';
	for (let i = 0; i < cols; i++) {
		tds += '<td></td>';
	}
	let trs = '';
	for (let i = 0; i < rows; i++) {
		trs += `<tr>${tds}</tr>`;
	}
	return `<table>${trs}</table>`;
}
