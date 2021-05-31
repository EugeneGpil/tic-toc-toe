import {useState} from 'react'
import Square from 'components/Square'

const Board = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [nextPlayer, setNextPlayer] = useState('X')
  const [winner, setWinner] = useState(null)

  const executeTurn = (x, y) => {
    if (winner) {
      return
    }

    const newBoard = board.map(row => [...row])
    if (newBoard[x][y] === '') {
      newBoard[x][y] = nextPlayer
      setNextPlayer(nextPlayer === 'X' ? 'O' : 'X')
    }

    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ]

    let newWinner = null
    for (const line of lines) {
      const [[ax, ay], [bx, by], [cx, cy]] = line
      if (newBoard[ax][ay] !== '' && newBoard[ax][ay] === newBoard[bx][by] && newBoard[ax][ay] === newBoard[cx][cy]) {
        newWinner = newBoard[ax][ay]
        break
      }
    }

    if (newWinner !== null) {
      setWinner(newWinner)
    }

    setBoard(newBoard)
  }



  const renderSquare = (x, y) => {
    return <Square
      value={board[x][y]}
      onClick={() => {executeTurn(x, y)}}
    />
  }

  return (
    <div>
      <div className="status">
        {
          winner
            ? `${winner} win!`
            : `Next player: ${nextPlayer}`
        }
      </div>
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
