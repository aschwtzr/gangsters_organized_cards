import React from 'react';
import Block from './components/Block';
import RecruitBoard from './views/RecruitView';
import BoardView from './views/BoardView';
import { randomHood } from './simulation/utilities'

export function Board({ ctx, G, moves }) {
  const [selectedBlock, setSelectedBlock] = React.useState(null)
  const [currentView, setCurrentView] = React.useState('')
  const [availableRecruits, setAvailableRecruits] = React.useState([])
  React.useEffect(() => {
    fetchRecruits()
  }, [])

  const fetchRecruits = async () => {
    const promises = [...Array(3)].map(async (_, idx) => {
      return randomHood()
    })
    const hoods = await Promise.all(promises)
    setAvailableRecruits(hoods)
    return hoods
  }

  const selectBlockAndSetView = (block) => {
    setSelectedBlock(block)
    if (currentView !== 'board') {
      setCurrentView('board')
    }
  }

  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  let tbody = [];
  let blockIdx = 0
  if (G.cells.length) {
    for (let i = 0; i < G.worldArea; i++) {
      let cells = []
      for (let j = 0; j < G.worldArea; j++) {
        let block = G.cells[blockIdx]
        cells.push(
          <Block
            owner={block.owner}
            captureBlock={() => moves.captureBlock(block.id)}
            selectBlock={() => selectBlockAndSetView(block)}
            id={block.id}
            key={`block_${block.id}`}
            stores={block.stores}
            type={block.name}
          />
        );
        blockIdx++
      }
      tbody.push(<tr key={`city_row_${i}`}>{cells}</tr>);
    }
  }
  const wrapperStyle ={
    display: 'flex',
    flexDirection: 'row'
  }

  const recruitView = <RecruitBoard recruit={(hood) => moves.recruitHood(hood)} name={'one'} key={'one'} availableRecruits={availableRecruits}/>
  const boardView = <BoardView selectedBlock={selectedBlock} currentMoves={G[ctx.currentPlayer].moves} currentPlayer={G[ctx.currentPlayer]} key={'two'}/>
  const hqView = <RecruitBoard recruit={(hood) => moves.recruitHood(hood)} name={'three'} key={'three'} availableRecruits={availableRecruits} />

  const renderSwitch = () => {
    switch (currentView) {
      case 'recruit':
        return recruitView
      case 'board':
        return boardView
      case 'hq':
        return hqView
    }
  }
  return (
    <div>
      <div style={wrapperStyle}>
        <table id="city_board" style={{backgroundColor: 'rgb(51, 50, 49)'}}>
          <tbody>{tbody}</tbody>
        </table>
        <div style={{...wrapperStyle, ...{flexDirection: 'column'}}}>
          <div id='actions_panel' style={{...wrapperStyle, paddingBottom: '1.5rem'}}>
            <button onClick={() => moves.rollDice()}>Roll Dice</button>
            <button onClick={() => setCurrentView('recruit')}>Recruitment</button>
            <button onClick={() => setCurrentView('board')}>Board</button>
            <button onClick={() => setCurrentView('hq')}>Headquarters</button>
          </div>
          { renderSwitch() }
        </div>
      </div>
    </div>
  );
}

