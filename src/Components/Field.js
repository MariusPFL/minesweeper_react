import React from "react";
import ConfettiExplosion from 'react-confetti-explosion';


function GameOver(){
    alert('game over');
    localStorage.removeItem("gameField")
    let currentPlayerScore = localStorage.getItem("playerScore");
    localStorage.setItem("playerScore", currentPlayerScore - 100);
    let currentGamesCount = localStorage.getItem("gameCount")
    localStorage.setItem("gameCount", currentGamesCount + 1)
    window.location.reload();
}

function Field(props){

    let hiddenValue = props.value;
    const[backGroundColor, setBackGroundColor] = React.useState("black");
    const [displayValue, setDisplayValue] = React.useState("?");
    const [showExplosions, setShowExplosions] = React.useState(false);
    function handleClick(event){
        if(event.ctrlKey){
            if (displayValue === "*") {
                setDisplayValue("?")
                setBackGroundColor("black")
            }
            else if(displayValue === "?"){
                setDisplayValue("*");
                setBackGroundColor("red")
            }
        }
        else if(displayValue != "*"){
            if (hiddenValue >= 100) {
                setDisplayValue("BOMBASTIC");
                setShowExplosions(true);
                window.setTimeout(GameOver, 3000)
                
            }
            else if(displayValue == "?" || displayValue == "*"){
                switch (hiddenValue) {
                    case 0:
                        setBackGroundColor("#33cc00")
                        break;
                    case 1:
                        setBackGroundColor("#86b300")
                        break;
                    case 2:
                        setBackGroundColor("#808000")
                        break;
                    case 3:
                        setBackGroundColor("#e68a00")
                        break;
                    default:
                        setBackGroundColor("#ff704d")
                        break;
                }
                props.increaseCounterMethod();
                setDisplayValue(props.value)
            }
        }
    }
    return(
        <div className="field" onClick={handleClick} style={{background: backGroundColor}}>
            {showExplosions ? <ConfettiExplosion /> : ""}
            <p>{displayValue} </p>
        </div>
    )
}

export default Field;