export const setPlayersScores = (scores) => {
	let markup = '';

	for (let i = 0; i < scores.length; i++) {
		markup += `<p class="player${i}">Player ${i}: <span>${scores[i]}</span></p>`;	
	}
	markup = 
		`<div class="players-score-container">
			${markup}
		</div>`;

	let playersScoreContainer = document.getElementsByClassName("players-score-container")[0];
	playersScoreContainer.parentNode.removeChild(playersScoreContainer);
	document.querySelector(".players-score-to-win-container").insertAdjacentHTML("beforeend", markup);
}

export const showScores = () => {
	document.querySelector(".score-container").style.bottom = `0px`;
	document.querySelector(".score-text-icon").style.display = "inline-block";
}

export const hideScores = () => {
	let score = document.querySelector(".score-container");
	score.style.bottom = `-${document.querySelector(".players-score-to-win-container").offsetHeight}px`;
	document.querySelector(".score-text-icon").style.display = "none";
}

export const setGamesToWin = (score) => {
	document.querySelector(".score-to-win").textContent = score;
} 