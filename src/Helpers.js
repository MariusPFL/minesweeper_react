

class Helpers{

    static addToScore(value) {
        let currentPlayerScore = localStorage.getItem("playerScore")
        localStorage.setItem("playerScore", Math.floor(parseInt(currentPlayerScore) + value));
    }
    static addToGameCount(value){
        let currentGameCount = localStorage.getItem("gameCount")
        localStorage.setItem("gameCount", Math.floor(parseInt(currentGameCount) + value))
    }
}

export default Helpers;