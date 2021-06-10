import {useState} from 'react'
import Board from 'components/Board'

const Game = () => {

  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])

  const [nextPlayer, setNextPlayer] = useState('X')
  const [winner, setWinner] = useState(null)

  const [history, setHistory] = useState([{
    board,
    nextPlayer
  }])

  const executeTurn = (x, y) => {
    if (winner || board[x][y] !== '') {
      return
    }

    const newBoard = board.map(row => [...row])
    newBoard[x][y] = nextPlayer
    const newNextPlayer = nextPlayer === 'X' ? 'O' : 'X'
    setNextPlayer(newNextPlayer)

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
    setHistory([
      ...history,
      {
        board: newBoard,
        nextPlayer: newNextPlayer
      }
    ])
  }

  const goToStep = (step) => {
    setHistory(history.slice(0, step + 1))
    setBoard(history[step].board)
    setNextPlayer(history[step].nextPlayer)
  }

  let status = `Next turn: ${nextPlayer}`
  if (winner) {
    status = `${winner} win!`
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          board={board}
          onClick={(x, y) => {executeTurn(x, y)}}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <div className='history'>
          {history.map((step, stepKey) => {
            return (
              <div
                key={stepKey}
                className='history-step-board'
                onClick={() => {goToStep(stepKey)}}
              >
                <div className='history-step-board-row'>
                  <div className='history-step-cell'>{step.board[0][0]}</div>
                  <div className='history-step-cell'>{step.board[0][1]}</div>
                  <div className='history-step-cell'>{step.board[0][2]}</div>
                </div>
                <div className='history-step-board-row'>
                  <div className='history-step-cell'>{step.board[1][0]}</div>
                  <div className='history-step-cell'>{step.board[1][1]}</div>
                  <div className='history-step-cell'>{step.board[1][2]}</div>
                </div>
                <div className='history-step-board-row'>
                  <div className='history-step-cell'>{step.board[2][0]}</div>
                  <div className='history-step-cell'>{step.board[2][1]}</div>
                  <div className='history-step-cell'>{step.board[2][2]}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Game
