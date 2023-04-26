import logo from './logo.svg';
import './App.css';
import Field from './Components/Field'
import React from 'react';
import Confetti from 'react-confetti'


function App() {
  console.log("Runs the code starts!")
  // The main Attributes
  let columnLength = 5;
  let rowLength = 5;
  let bombsCount;
  let gameFieldAsArray = [];
  
  const [openFields, setOpenFields] = React.useState(0);
  const [showWinEffect, setShowWinEffect] = React.useState(false);
  // Get things from the LocalStorage
  if (localStorage.getItem("bombsNumber") != null) {
    bombsCount = localStorage.getItem("bombsNumber")
  }
  else{
    bombsCount = rowLength;
  }

  let resultFromLocalStorage = JSON.parse(localStorage.getItem("gameField"));
  console.log("Results from Local Storage:")
  console.log(localStorage.getItem("gameField"));
  if (resultFromLocalStorage != null) {
    gameFieldAsArray = resultFromLocalStorage;
  }
  else{
    CreateFieldAndSaveToLocalStorage();
  }


  // Check winning Conditions
  React.useEffect(() => {
    if (openFields === (rowLength * columnLength) - bombsCount) {
      // alert("you won!");
      setShowWinEffect(true)
      window.setTimeout(RestartTheGame, 5000)
    }
  }, [openFields])

  // Functions
  function CreateFieldAndSaveToLocalStorage(){
    // Creating the Game Field and generates boms and numbers
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
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
        let yAxis = getRandomNumber(rowLength);
        let xAxis = getRandomNumber(columnLength);
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
    console.log('setting for: y: ' + yAxisIndex + ' x: ' + xAxisIndex)
    if (yAxisIndex < 0 || yAxisIndex > rowLength -1) {
      console.log('yAxis outside bounds')
    }
    else if(xAxisIndex < 0 || xAxisIndex > columnLength - 1){
      console.log('xAxis outside bounds')
    }
    else if(gameFieldAsArray[yAxisIndex][yAxisIndex] >= 100){
      console.log('already bomb on that field')
    }
    else{
      gameFieldAsArray[yAxisIndex][xAxisIndex] = gameFieldAsArray[yAxisIndex][xAxisIndex] + 1;
      console.log('success');
    }
  }
  function getRandomNumber(max){
    return Math.floor(Math.random() * max);
  }

  // function createFields(){
  //   for (let rowCount = 0; rowCount < rowLength; rowCount++) {
  //     for (let columnCount = 0; columnCount < columnLength; columnCount++) {
  //       (
  //         <Field 
  //         id = {((rowCount * 10) + "|" + (columnCount * 10))}
  //         value = {gameFieldAsArray[rowCount][columnCount]}
  //         />
  //       )
  //     }
  //   }
  // }
  return (
    <div className="App">
      {showWinEffect ? <Confetti /> : "" }
      <div className='gameboy'>
        <div className='gameField'>
          {
            // createFields()
          }
          <div className='rowContainer'>
          <Field 
            value = {gameFieldAsArray[0][0]}
            increaseCounterMethod = {increaseOpenedFieldsCounter}
          />
          <Field 
            value = {gameFieldAsArray[0][1]}
            increaseCounterMethod = {increaseOpenedFieldsCounter}
          />
          <Field 
            value = {gameFieldAsArray[0][2]}
            increaseCounterMethod = {increaseOpenedFieldsCounter}
          />
          <Field 
            value = {gameFieldAsArray[0][3]}
            increaseCounterMethod = {increaseOpenedFieldsCounter}
          />
          <Field 
            value = {gameFieldAsArray[0][4]}
            increaseCounterMethod = {increaseOpenedFieldsCounter}
          />
          </div>

          <div className='rowContainer'>
            <Field 
              value = {gameFieldAsArray[1][0]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[1][1]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[1][2]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[1][3]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[1][4]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
          </div>


          <div className='rowContainer'>
            <Field 
              value = {gameFieldAsArray[2][0]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[2][1]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[2][2]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[2][3]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[2][4]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
          </div>

          <div className='rowContainer'>
            <Field 
              value = {gameFieldAsArray[3][0]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[3][1]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[3][2]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[3][3]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[3][4]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
          </div>

          <div className='rowContainer'>
            <Field 
              value = {gameFieldAsArray[4][0]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[4][1]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[4][2]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[4][3]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
            <Field 
              value = {gameFieldAsArray[4][4]}
              increaseCounterMethod = {increaseOpenedFieldsCounter}
            />
          </div>
        </div>
        <p>Opened Fields: {openFields}</p>
        <p>Bombs count: {bombsCount}</p>
        <button onClick={RestartTheGame}>Restart</button>
        <input type='number' value={bombsCount} id="inputBombNumber"/>
        <button onClick={() =>{
          localStorage.setItem("bombsNumber", document.getElementById("inputBombNumber").value)
        }}>regenerate</button>
      </div>
    </div>
  );
}

export default App;
