import SOUNDEFFECTEXPLOSION from "./Sounds/explosionEffect.mp3"

class Helpers{
    static SoundList = {
        "EXPLOSION": SOUNDEFFECTEXPLOSION,
    }
    static addToScore(value) {
        let currentPlayerScore = localStorage.getItem("playerScore")
        localStorage.setItem("playerScore", Math.floor(parseInt(currentPlayerScore) + value));
    }
    static addToGameCount(value){
        let currentGameCount = localStorage.getItem("gameCount")
        localStorage.setItem("gameCount", Math.floor(parseInt(currentGameCount) + value))
    }
    static playSound(soundFromSoundList){
        const mySound = new Audio(soundFromSoundList)
        mySound.loop = false;
        mySound.play();
    }
}

export default Helpers;