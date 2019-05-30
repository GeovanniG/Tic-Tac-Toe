export default class Score {
    constructor(score) {
        updateScore(score);
    }

    updateScore(score) {
        if (isValidScore(score)) {
            this._playerScore = score;
        } else {
            throw new Error("Score must be an integer value");
        }
    }

    isValidScore(score) {
        return Number.isInteger(score);
    }

}