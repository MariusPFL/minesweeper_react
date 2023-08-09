import React from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import Helpers from "../Helpers";

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
                props.gameOverFunctionLoose();
            }
            else if(displayValue == "?"){
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
                Helpers.addToScore(hiddenValue * 4);
                props.increaseCounterMethod();
                setDisplayValue(props.value)
            }
        }
    }
    function onRightClick(event){
        event.preventDefault();
        if (displayValue === "*") {
            setDisplayValue("?")
            setBackGroundColor("black")
        }
        else if(displayValue === "?"){
            setDisplayValue("*");
            setBackGroundColor("red")
        }
    }
    return(
        <div className="field" onContextMenu={onRightClick} onClick={handleClick} style={{background: backGroundColor}} id={props.id}>
            {showExplosions ? <ConfettiExplosion /> : ""}
            <p>{displayValue} </p>
        </div>
    )
}

export default Field;