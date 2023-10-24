import { useEffect } from 'react';

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

        // algorithm for AI move determination goes here, using availableMoves index for reference. Can also use board[i] to get a full picture of the state of the board (friendly and opponent).

        // example below is random moves

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const randomMove = availableMoves[randomIndex];

        onAiMove(randomMove);
      }
    }
  }, [board, onAiMove, gameOver]);

  return null;
};

export default Ai;








