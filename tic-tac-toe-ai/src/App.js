import React, { useState } from "react";
import './App.css';
import { Board } from './components/board';
import { ScoreBoard } from "./components/scoreboard";
import { Reset } from "./components/reset";
import Ai from "./AI/AIv1"; 

function App() {
  const win_cond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; // each unique possible winning scenario

  const [board, setBoard] = useState(Array(9).fill(null)); // board constant, state can be changed using setBoard(). Initial state is array length 9 with null values.
  const [xPlaying, setXPlaying] = useState(true); // determines whether the player (X) or AI (O) is currently making their move.
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 }); // storing scores and changing scores after each round
  const [gameOver, setGameOver] = useState(false); // gameOver boolean so AI or player can't make additional moves once victory is achieved.
  const [winCountActive, setWinCountActive] = useState(true); // initally set as true, when a victory is achieved this is set to false until the board is reset so that the count for a win only increments once

  const updateScores = (winner) => { // updates the score for both player and AI after a round
    if (winCountActive) {
      const updatedScores = { ...scores };
      if (winner === "O") { 
        updatedScores.oScore += 1;
      } 
      else { // at this point a win has already been confirmed so can just use else, doesnt need logic (1/0)
        updatedScores.xScore += 1;
      }
      setScores(updatedScores);
      setWinCountActive(false); // so the win is only counted once whilst waiting to be reset
    }
  };

  const handleBoxClick = (boxIdx) => { //tracks manual player moves - logic uses boxIdx in the app function return as bottom 
    if (xPlaying) {
      const updatedBoard = board.map((value, idx) => { //sets value based on index of box clicked from board.js
        if (idx === boxIdx) {
          return "X";
        } else {
          return value;
        }
      });

      const winner = checkWin(updatedBoard); //checks if a win has been achieved

      if (winner) {
        updateScores(winner);
      } else if (updatedBoard.every((cell) => cell !== null)) { // checks for draw and if true stops game
        setGameOver(true);
      } else {
        setXPlaying(false);
      }
      setBoard(updatedBoard); //updates the board on screen to display completed state after click
    }
  };

  const checkWin = (board) => {
    for (let i = 0; i < win_cond.length; i++) { // iterares through win conditions list so each possibility can be checked
      const [x, y, z] = win_cond[i]; 
      if (board[x] && board[x] === board[y] && board[y] === board[z]) { // checks if x has value, if yes, checks if equal to y, if yes, checks if y has value, if yes, checks if equal to z
        setGameOver(true); // ends game if win achieved
        return board[x]; // returns O or X value (would also work as board[y] or board[z])
      }
    }
  };

  const resetBoard = () => { // resets board to blank state
    setGameOver(false);
    setWinCountActive(true) // allows for a win to be counted again
    setBoard(Array(9).fill(null));
  };

  const handleAiMove = (aiMove) => { // handles the AI decisions - logic uses aiMove in app return at bottom
    if (xPlaying === false){ // ensures it is the AI turn
      const updatedBoard = board.slice(); // creates an exact copy of the board in a new constant
      updatedBoard[aiMove] = "O"; 

      const winner = checkWin(updatedBoard);

      if (winner) {
        updateScores(winner);
      } else if (updatedBoard.every((cell) => cell !== null)) {
        setGameOver(true);
      } else {
        setXPlaying(true);
      }
      setBoard(updatedBoard);
    }
  };

  return ( // this section is essentially where the constants interact with the other js script files and take their inputs.
    <div className="App"> 
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <Reset resetBoard={resetBoard} />
      <Ai board={board} onAiMove={handleAiMove} gameOver = {gameOver} />
    </div>
  );
}

export default App;

