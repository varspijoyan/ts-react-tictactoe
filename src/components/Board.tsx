import { useEffect, useState } from "react";
import "../styles/Board.css";

interface Player {
  player: "X" | "O";
}

const Board: React.FC<Player> = ({ player }) => {
  // all the needed states
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<"X" | "O">(player);
  const [winner, setWinner] = useState<null | "X" | "O">(null);
  const [tie, setTie] = useState(false);
 
  // clicking on the boxes
  const handleClick = (index: number) => {
    // if the boxes is already filled we will just skip, or if the player is won we will not allow to fill the boxes
    if (winner || boxes[index]) return; 

    // it's like when the player makes his first step (1 turn)
    // react deletes the render of the 1 turn and creates the new render for the next step (turn) and fills the new box with the old box
    const newBoxes = [...boxes];
    newBoxes[index] = playerTurn;
    setBoxes(newBoxes);
    setPlayerTurn(playerTurn === "X" ? "O" : "X");
  };
  
  // checking for a winner
  // depends on which box position values are
  useEffect(() => {
    const checkWinner = (player: 'X' | 'O') => {
      if((boxes[0] === player && boxes[1] === player && boxes[2] === player) || 
          (boxes[3] === player && boxes[4] === player && boxes[5] === player) ||
          (boxes[6] === player && boxes[7] === player && boxes[8] === player) || 
          (boxes[0] === player && boxes[3] === player && boxes[6] === player) ||
          (boxes[1] === player && boxes[4] === player && boxes[7] === player) ||
          (boxes[2] === player && boxes[5] === player && boxes[8] === player) ||
          (boxes[0] === player && boxes[4] === player && boxes[8]  === player) ||
          (boxes[2] === player && boxes[4] === player && boxes[6] === player)) {
        return true;
      } else {
        return false;
      }
    }  
  
    if(checkWinner("X")) {
      setWinner("X");
      return;
    } else if(checkWinner("O")) {
      setWinner("O");
      return;
    }
  }, [boxes]);

  // checking for tie game
  useEffect(() => {
    const checkForTieGame = () => {
      for(let i = 0; i < boxes.length; i++) {
        if(boxes[i] === null) {
          return false;
        }
      }
      return true;
    }

    if(!winner && checkForTieGame()) {
      setTie(prev => !prev);
    }
  }, [boxes, winner]);

  // restarting the game
  const handleRestart = () => {
    setBoxes(Array(9).fill(null));
    setPlayerTurn("X");
    setWinner(null);
    setTie(false);
  }

  // rendering the component
  return (
    <>
      <div className="board-container">
        <p className="turn-text">{winner ? `${winner} wins!` : tie ? "Tie game" : `${playerTurn}'s turn`}</p>
        <div className="board">
          {boxes.map((value, index) => (
            <div className={`box ${value === 'X' ? 'x' : 'o'}`} key={index} onClick={() => handleClick(index)}>
              {value}
            </div>
          ))}
        </div>
      </div>
      <button className="restart" onClick={handleRestart}>Restart</button>
    </>
  );
};

export default Board;
