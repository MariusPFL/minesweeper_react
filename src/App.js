import logo from './logo.svg';
import './App.css';
import Field from './Components/Field'
import React from 'react';
import Confetti from 'react-confetti'
import Helpers from './Helpers';
import Footer from './Components/Footer';

function App() {
  console.log("Runs the code starts!")
  // The main Attributes
  // Ist hier die yAxis
  const [rowCount, setRowCount] = React.useState(localStorage.getItem("rowCount") != null ? localStorage.getItem("rowCount") : 5);
  // Ist hier die xAxis
  const [columnCount, setColumnCount] = React.useState(localStorage.getItem("columnCount") != null ? localStorage.getItem("columnCount") : 5);
  
  const [bombsCount, setBombsCount] = React.useState(localStorage.getItem("bombsNumber") != null ? localStorage.getItem("bombsNumber") : rowCount);

  const [playerScore, setPlayerScore] = React.useState(localStorage.getItem("playerScore"));

  const [isFieldDisabled, setIsFieldDisabled] = React.useState(false);

  if (playerScore == null) {
    localStorage.setItem("playerScore", 0);
    setPlayerScore(0);
  }

  if (localStorage.getItem("gameCount") == null) {
    localStorage.setItem("gameCount", 0)
  }
  const [currentFieldSize, setCurrentFieldSize] = React.useState(1);

  const [currentBombsCount, setCurrentBombsCount] = React.useState(0);
  
  let gameFieldAsArray = [];
  
  const [openFields, setOpenFields] = React.useState(0);
  const [showWinEffect, setShowWinEffect] = React.useState(false);
  
  let resultFromLocalStorage = JSON.parse(localStorage.getItem("gameField"));
  if (resultFromLocalStorage != null) {
    gameFieldAsArray = resultFromLocalStorage;
  }
  else{
    CreateFieldAndSaveToLocalStorage();
  }
  
  // UseEffects
  React.useEffect(() => {
    createFields();
    setCurrentFieldSize(rowCount * columnCount);
    setCurrentBombsCount(bombsCount);
  }, [])

  React.useEffect(() => {
    if (rowCount * columnCount / 2 < bombsCount) {
      setBombsCount(Math.floor(rowCount * columnCount / 2))
    }
  }, [rowCount, columnCount])
  
  // Check winning Conditions
  React.useEffect(() => {
    if (openFields === (currentFieldSize) - currentBombsCount) {
      winning();
    }
  }, [openFields])

  // Functions
  function winning(){
      // alert("you won!");
      setIsFieldDisabled(true);
      setShowWinEffect(true)
      Helpers.addToScore(Math.floor((currentBombsCount / currentFieldSize) * 400));
      Helpers.addToGameCount(1)
      window.setTimeout(RestartTheGame, 5000)
  }

  function GameOverLoose(){
    setIsFieldDisabled(true)
    Helpers.playSound(Helpers.SoundList.EXPLOSION)
    window.setTimeout(() => {
      alert('game over');
      localStorage.removeItem("gameField")
      Helpers.addToScore(-100)
      Helpers.addToGameCount(1);
      window.location.reload();
    }, 3000)
}

  function CreateFieldAndSaveToLocalStorage(){
    // Creating the Game Field and generates boms and numbers
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        row.push(0);
      }
      gameFieldAsArray.push(row);
    }
    setBombsAndNumbers();
    JSON.stringify(localStorage.setItem("gameField", JSON.stringify(gameFieldAsArray)));
  }
  function increaseOpenedFieldsCounter(){
    setOpenFields(prevNumber => prevNumber + 1);
  }

  function RestartTheGame(){
    // alert('is restarting the game');
    localStorage.removeItem("gameField")
    window.location.reload();
  }

  function setBombsAndNumbers(){
    for (let index = 0; index < bombsCount; index++) {
        let yAxis = getRandomNumber(rowCount);
        let xAxis = getRandomNumber(columnCount);
      if (gameFieldAsArray[yAxis][xAxis] < 100) {
        gameFieldAsArray[yAxis][xAxis] = 100
        // Going through all the neighbours and highers them
        setNumber(yAxis, xAxis - 1)
        setNumber(yAxis - 1, xAxis -1)
        setNumber(yAxis -1, xAxis)
        setNumber(yAxis -1, xAxis + 1)
        setNumber(yAxis, xAxis + 1)
        setNumber(yAxis + 1, xAxis + 1)
        setNumber(yAxis + 1, xAxis)
        setNumber(yAxis + 1, xAxis - 1)
      }
      else{
        index--;
      }
    }
  }
  
  function setNumber(yAxisIndex, xAxisIndex){
    // Sorry for this confusion this construction exists because of the console Logging which is obsolete now. But if needed again.
    if (yAxisIndex < 0 || yAxisIndex > rowCount -1) {
    }
    else if(xAxisIndex < 0 || xAxisIndex > columnCount - 1){
    }
    else if(gameFieldAsArray[yAxisIndex][xAxisIndex] >= 100){
    }
    else{
      gameFieldAsArray[yAxisIndex][xAxisIndex] = gameFieldAsArray[yAxisIndex][xAxisIndex] + 1;
    }
  }
  function getRandomNumber(max){
    return Math.floor(Math.random() * max);
  }
  
  function showTutorial(){
    alert("Your objective is to click all the hidden fields [?] without ever clicking on a mine. You can (un)mark the fields with Holding CTRL while clicking!"

    + "If you wanna make your life easier or more hell ;) you can adjust the difficulty very precisely down below, " +
    "adjust the field and the Bombscount and then you can click on regenerate to save it and generate.")
  }

  function createFields(){
    return(
      gameFieldAsArray.map((row, yIndex) => (
        <div className='rowContainer'>
          {
            row.map((fieldValue, xIndex) => (
            <Field 
              value = {gameFieldAsArray[yIndex][xIndex]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
              gameOverFunctionLoose = {GameOverLoose}
              id={"field" + yIndex + "-" + xIndex}
              yIndex = {yIndex}
              xIndex = {xIndex}
            />
            ))
          }
          </div>
      ))
    )
  }
  
  // returning React Components

  return (
    <div className="App">
      {showWinEffect ? <Confetti /> : "" }
      <div className='blankSpaces100px'/>
      <div className='gameboy'>
        <center>
          <p className='gameBoyLabel'>Your Overall Score: {playerScore}</p>
          <div className='gameField' id='gameField' style={{pointerEvents: isFieldDisabled ? "none" : "auto"}}>
            {
              createFields()
            }
          </div>
        </center>
        <p className='gameBoyLabel'>Total Fields: {currentFieldSize}</p>
        <p className='gameBoyLabel'>Total Bombs: {currentBombsCount}</p>
        <p className='gameBoyLabel'>Difficulty: {Math.round((currentBombsCount / (currentFieldSize)) * 200)} %</p>
        <p className='gameBoyLabel'>Opened Fields: {openFields}</p>
        <p className='gameBoyLabel'>Fields left: {currentFieldSize - currentBombsCount - openFields}</p>
        <button className='gameBoyButton' onClick={showTutorial}>?</button>
        <button className='gameBoyButton' onClick={RestartTheGame}>Restart</button>
        <div style={{display: 'flex', flexDirection: 'column', width: 'min-content'}}>
          <h1>Configuration Game</h1>
          <label>Bombs</label>
          <input type='number' value={bombsCount} onChange={(event) => {setBombsCount(event.target.value)}} id="inputBombNumber" min={1} max={rowCount * columnCount / 2} className='configurationInput'/>
          <label>Rows</label>
          <input type='number' className='configurationInput' value={rowCount} onChange={(event) => 
            {
              setRowCount(event.target.value);
            }} id="inputRowCount" min={1} max={16} />
          <label>Columns</label>
          <input type='number' className='configurationInput' value={columnCount} onChange={(event) => {
            setColumnCount(event.target.value);
            }} id="inputColumnCount" min={2} max={16} />
            <p>Difficulty: {Math.round((bombsCount / (rowCount * columnCount)) * 200)} %</p>
          <button className='configurationButton' onClick={() =>{
            localStorage.setItem("bombsNumber", bombsCount)
            localStorage.setItem("rowCount", rowCount);
            localStorage.setItem("columnCount", columnCount);
            RestartTheGame();
          }}>regenerate Field</button>
        </div>
        <div className='blankSpaces100px'></div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
