import React from "react";

function Field(props){
    let hiddenValue = props.value;
    const[backGroundColor, setBackGroundColor] = React.useState("black");
    const [displayValue, setDisplayValue] = React.useState("?");
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
            setDisplayValue(props.value)
            if (hiddenValue >= 100) {
                alert('game over');
                localStorage.removeItem("gameField")
                let currentPlayerScore = localStorage.getItem("playerScore");
                localStorage.setItem("playerScore", currentPlayerScore - 100);
                window.location.reload();
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
            }
        }
    }
    return(
        <div className="field" onClick={handleClick} style={{background: backGroundColor}}>
            <p>{displayValue} </p>
        </div>
    )
}

export default Field;