import {useState } from 'react';
import './App.css'
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS ={
  X:'Player 1',
  O:'Player 2'
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(arr => [...arr])];

  for (const turn of gameTurns){
      const { square , player } = turn;
      const { row , col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurns){
  let currPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currPlayer = 'O';
  }

  return currPlayer;
}

function deriveWinner(gameBoard , players){
  let winner = null;

  for(const combo of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column];
    const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column];
    const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column];

    if(
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol)
      {
        winner = players[firstSquareSymbol];
    }
  }
  return winner;
}



export default function App() {

  const [ gameTurns , setGameTurns ] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const [players , setPlayers]= useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIdx , colIdx){

    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row : rowIdx , col : colIdx } , player : currentPlayer}, ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol , newName){
    setPlayers((previousPlayers) => {
      return {
        ...previousPlayers ,
        [symbol] : newName
      };
    });
  }

  return (
    <main>
      <div id='game-container'>

        <ol id='players' className='highlight-player'>
          <Player 
          initialName={PLAYERS.X} 
          symbol="X" 
          isActive={activePlayer === 'X'}
          onChangeName = {handlePlayerNameChange}
          />

          <Player 
          initialName={PLAYERS.O}
          symbol="O" 
          isActive={activePlayer === 'O'}
          onChangeName = {handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && 
        (<GameOver winner={winner} onRestart={handleRestart}
        />)}

        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board = {gameBoard}
        />

      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}


