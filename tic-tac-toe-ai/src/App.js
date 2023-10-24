import React, { useState } from "react";

import './App.css';

import { Board } from './components/board'

import { ScoreBoard} from "./components/scoreboard"

import { Reset } from "./components/reset"

function App() {

  const win_cond = [  //all possible combinations to win
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const [board, setBoard] = useState(Array(9).fill(null)); //sets board to initial null value, use setBoard to update
  const [xPlaying, setXPlaying] = useState(true); // x player starts by default, then switches throughout play
  const [scores, setScores] = useState({xScore: 0, oScore: 0}) //initialises scores as 0 then used to update after each victory
  const [gameOver, setGameOver] = useState(false)  //recognises when victory has been achieved so no more tiles can be placed

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O"; //sets box value to X or O depending on current state of xPlaying (true or false)
      }
      else {
        return value;
      }
    })

    const winner = checkWin(updatedBoard);

    if(winner) { // if winner is true
      if(winner === "O"){
        let {oScore} = scores;
        oScore +=1
        setScores({...scores, oScore}) //keeps other scores the same, ands adds 1 to oScore    
      }
      else{
        let {xScore} = scores;
        xScore +=1
        setScores({...scores, xScore}) //keeps other scores the same, ands adds 1 to xScore       
      }
    }

    setBoard(updatedBoard);

    setXPlaying(!xPlaying); //changes player 

  }

  //board state for AI accessable from here

  const checkWin = (board) => {
    for(let i = 0; i < win_cond.length; i++) { //iterates through the win condition list
      const [x,y,z] = win_cond[i]; //unpacks values from wincond into x,y,z variables

      if (board[x] && board[x] === board[y] && board[y] === board[z]) { //if board[x] exists (not null), then compare to board[y], if board[y] exists then compare to board[z] (for each unique win condition )
        setGameOver(true)
        return board[x]
      }
    }
  }

  const resetBoard = () => { //resets board to null
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  return (
    <div className="App">
      <ScoreBoard scores = {scores} xPlaying = {xPlaying}/>
      <Board board = {board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <Reset resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
