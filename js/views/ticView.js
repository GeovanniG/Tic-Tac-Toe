export const fillSquare = (td, player, playersColors) => {
	td.style.background = playersColors[player];
}

export const celebrate = (player, dim) => {
	document.querySelector(".winner-container").style.display = "block";
	document.querySelector(".winner").textContent = player;
	document.querySelector(".reset").addEventListener("click", () => {
		reset(dim);
	});
}

export const unfillAllSquares = dim => {
	for (let i = 0; i < dim; i++) {
		document.querySelectorAll("td")[i].style.background = "#F0F0F0";
	}
}

export const tie = dim => {
	document.querySelector(".tie-container").style.display = "block";
	document.querySelectorAll(".reset")[1].addEventListener("click", () => {
		reset(dim);
	});
}

export const reset = dim => {
	document.querySelector(".winner-container").style.display = "none";
	document.querySelector(".tie-container").style.display = "none";
	unfillAllSquares(dim);
}