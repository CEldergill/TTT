import React, { useState } from "react";
import './App.css';
import { Board } from './components/board';
import { ScoreBoard } from "./components/scoreboard";
import { Reset } from "./components/reset";
import Ai from "./AI/AIv1"; // Use default import

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
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winCountActive, setWinCountActive] = useState(true);

  const updateScores = (winner) => {
    if (winCountActive) {
      const updatedScores = { ...scores };
      if (winner === "O") {
        updatedScores.oScore += 1;
      } else {
        updatedScores.xScore += 1;
      }
      setScores(updatedScores);
      setWinCountActive(false);
    }
  };

  const handleBoxClick = (boxIdx) => {
    if (xPlaying) {
      const updatedBoard = board.map((value, idx) => {
        if (idx === boxIdx) {
          return "X";
        } else {
          return value;
        }
      });

      const winner = checkWin(updatedBoard);

      if (winner) {
        updateScores(winner);
        setBoard(updatedBoard);
      } else if (updatedBoard.every((cell) => cell !== null)) {
        setGameOver(true);
      } else {
        setBoard(updatedBoard);
        setXPlaying(false);
      }
    }
  };

  const checkWin = (board) => {
    for (let i = 0; i < win_cond.length; i++) {
      const [x, y, z] = win_cond[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setWinCountActive(true)
    setBoard(Array(9).fill(null));
  };

  const handleAiMove = (aiMove) => {
    if (xPlaying === false){
      const updatedBoard = board.slice();
      updatedBoard[aiMove] = "O";

      const winner = checkWin(updatedBoard);

      if (winner) {
        updateScores(winner);
        setBoard(updatedBoard);
      } else if (updatedBoard.every((cell) => cell !== null)) {
        setGameOver(true);
      } else {
        setBoard(updatedBoard);
        setXPlaying(true);
      }
    }
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <Reset resetBoard={resetBoard} />
      <Ai board={board} onAiMove={handleAiMove} gameOver = {gameOver} />
    </div>
  );
}

export default App;

