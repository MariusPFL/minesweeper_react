import logo from './logo.svg';
import './App.css';
import Field from './Components/Field'
import React from 'react';
import Confetti from 'react-confetti'


function App() {
  console.log("Runs the code starts!")
  // The main Attributes
  // Ist hier die yAxis
  const [rowCount, setRowCount] = React.useState(localStorage.getItem("rowCount") != null ? localStorage.getItem("rowCount") : 5);
  // Ist hier die xAxis
  const [columnCount, setColumnCount] = React.useState(localStorage.getItem("columnCount") != null ? localStorage.getItem("columnCount") : 5);
  
  const [bombsCount, setBombsCount] = React.useState(localStorage.getItem("bombsNumber") != null ? localStorage.getItem("bombsNumber") : rowCount);

  const [currentFieldSize, setCurrentFieldSize] = React.useState(0);
  
  let gameFieldAsArray = [];
  
  const [openFields, setOpenFields] = React.useState(0);
  const [showWinEffect, setShowWinEffect] = React.useState(false);
  
  let resultFromLocalStorage = JSON.parse(localStorage.getItem("gameField"));
  console.log("Results from Local Storage:")
  console.log(localStorage.getItem("gameField"));
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
  }, [])

  React.useEffect(() => {
    if (rowCount * columnCount / 2 < bombsCount) {
      setBombsCount(Math.floor(rowCount * columnCount / 2))
    }
  }, [rowCount, columnCount])
  
  // Check winning Conditions
  React.useEffect(() => {
    if (openFields === (currentFieldSize) - bombsCount) {
      // alert("you won!");
      setShowWinEffect(true)
      window.setTimeout(RestartTheGame, 5000)
    }
  }, [openFields])

  // Functions
  function CreateFieldAndSaveToLocalStorage(){
    // Creating the Game Field and generates boms and numbers
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        row.push(0);
      }
      gameFieldAsArray.push(row);
    }
  
    console.log(gameFieldAsArray); 
    
    setBombsAndNumbers();
    console.log("Updated game field");
    console.log(gameFieldAsArray);
    JSON.stringify(localStorage.setItem("gameField", JSON.stringify(gameFieldAsArray)));
  }
  function increaseOpenedFieldsCounter(){
    setOpenFields(prevNumber => prevNumber + 1);
  }

  function RestartTheGame(){
    alert('is restarting the game');
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
  
  // Sorry for this confusion this construction exists because of the console Logging which is obsolete now
  function setNumber(yAxisIndex, xAxisIndex){
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
    alert("Your objective is to click all the hidden fields [?] without ever clicking on a mine. You can (un)mark the fields with Holding CTRL while clicking! If you wanna make your life easier or more hell ;) you can adjust the difficulty very precisely down below, adjust the field and the Bombscount and then you can click on regenerate to save it and generate.")
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
            />
            ))
          }
          </div>
      ))
    )
  }

  return (
    <div className="App">
      {showWinEffect ? <Confetti /> : "" }
      <div className='blankSpaces100px'/>
      <div className='gameboy'>
        <center>
          <div className='gameField' id='gameField'>
            {
              createFields()
            }
          </div>
        </center>
        <p>Total Fields: {currentFieldSize}</p>
        <p>Total Bombs: {bombsCount}</p>
        <p>Difficulty: {Math.round((bombsCount / (currentFieldSize)) * 200)} %</p>
        <p>Opened Fields: {openFields}</p>
        <p>Fields left: {currentFieldSize - bombsCount - openFields}</p>
        <button onClick={showTutorial}>?</button>
        <button onClick={RestartTheGame}>Restart</button>
        <div style={{display: 'flex', flexDirection: 'column', width: 'min-content'}}>
          <label>Bombs</label>
          <input type='number' value={bombsCount} onChange={(event) => {setBombsCount(event.target.value)}} id="inputBombNumber" min={1} max={rowCount * columnCount / 2}/>
          <label>Rows</label>
          <input type='number' value={rowCount} onChange={(event) => 
            {
              setRowCount(event.target.value);
            }} id="inputRowCount" min={1} max={16}/>
          <label>Columns</label>
          <input type='number' value={columnCount} onChange={(event) => {
            setColumnCount(event.target.value);
            }} id="inputColumnCount" min={2} max={16} />
            <p>Difficulty: {Math.round((bombsCount / (rowCount * columnCount)) * 200)} %</p>
          <button onClick={() =>{
            localStorage.setItem("bombsNumber", bombsCount)
            localStorage.setItem("rowCount", rowCount);
            localStorage.setItem("columnCount", columnCount);
            RestartTheGame();
          }}>regenerate Field</button>
        </div>
      </div>
    </div>
  );
}

export default App;
