export const displayPlayerScore = (player, score) => {
	document.querySelector(`.player${player}`).textContent = score;
}