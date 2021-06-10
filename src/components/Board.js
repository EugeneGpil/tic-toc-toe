import {useState} from 'react'
import Square from 'components/Square'

const Board = ({
  board,
  onClick
}) => {



  const renderSquare = (x, y) => {
    return <Square
      value={board[x][y]}
      onClick={() => {onClick(x, y)}}
    />
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0, 0)}
        {renderSquare(0, 1)}
        {renderSquare(0, 2)}
      </div>
      <div className="board-row">
        {renderSquare(1, 0)}
        {renderSquare(1, 1)}
        {renderSquare(1, 2)}
      </div>
      <div className="board-row">
        {renderSquare(2, 0)}
        {renderSquare(2, 1)}
        {renderSquare(2, 2)}
      </div>
    </div>
  )
}

export default Board
