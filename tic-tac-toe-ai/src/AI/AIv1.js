import React, { useState, useEffect } from 'react';

const Ai = ({ board, onAiMove, gameOver }) => {
  useEffect(() => {
    if (board.includes(null) && gameOver !== true) {
      const availableMoves = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          availableMoves.push(i);
        }
      }

      if (availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const randomMove = availableMoves[randomIndex];

        onAiMove(randomMove); // Notify the parent component of the AI move
      }
    }
  }, [board, onAiMove, gameOver]);

  return null;
};

export default Ai;








