export default class Form {
    constructor() {
    }

    getNumOfPlayers() {
        return Number(document.getElementById("players").value);
    }

    getPlayersColors() {
        let colors = [];
        for (let i = 0; i < this.getNumOfPlayers(); i++) {
            colors.push(document.getElementById(`color${i}`).value);
        }
        return colors;
    }

    getGridSettings() {
        return [Number(document.getElementById("rows").value), Number(document.getElementById("cols").value)];
    }

    getGamesToWin() {
        return Number(document.getElementById("winning").value);
    }

    getAdjacentSquaresNeededToWin() {
        return Number(document.getElementById("adj-squares").value);
    }
}