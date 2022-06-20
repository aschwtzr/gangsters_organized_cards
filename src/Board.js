import React from 'react';
import RecruitView from './views/RecruitView';
import BoardView from './views/BoardView';
import CityView from './views/CityView';
import { randomHood } from './simulation/utilities';

export function Board({ ctx, G, moves }) {
  // TODO: selectedBlock should be a function that takes a selected index to make BoardView reactive
  const [selectedBlock, setSelectedBlock] = React.useState(null)
  const [currentView, setCurrentView] = React.useState('')

  React.useEffect(() => {
    fetchRecruits()
  }, [])

  const fetchRecruits = async () => {
    const promises = [...Array(3)].map(async (_) => {
      return randomHood()
    })
    const hoods = await Promise.all(promises)
    const mapped = hoods.reduce((sum, curr) => {
      sum[curr.gId] = curr
      return sum 
    }, {})
    
    moves.setAvailableRecruits(mapped)
    return hoods
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


  const wrapperStyle ={
    display: 'flex',
    flexDirection: 'row'
  }

  const recruitView = <RecruitView recruit={(hood) => moves.recruitHood(hood)} name={'one'} key={'one'} availableRecruits={G.availableRecruits} player={G[ctx.currentPlayer]} fetchRecruits={fetchRecruits} />
  const boardView = <BoardView selectedBlock={selectedBlock} currentMoves={G[ctx.currentPlayer].moves} currentPlayer={G[ctx.currentPlayer]} purchase={moves.purchase} key={'two'}/>
  const hqView = <BoardView selectedBlock={selectedBlock} currentMoves={G[ctx.currentPlayer].moves} currentPlayer={G[ctx.currentPlayer]} purchase={moves.purchase} key={'three'}/>

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
        <CityView 
          worldArea={G.worldArea} 
          cells={G.cells} 
          setSelectedBlock={setSelectedBlock} 
          setCurrentView={setCurrentView} 
          captureBlock={moves.captureBlock}
        />
        <div style={{...wrapperStyle, ...{flexDirection: 'column'}}}>
          <div id='actions_panel' style={{...wrapperStyle, paddingBottom: '1.5rem'}}>
            <button disabled={G.hasRolled} onClick={() => moves.rollDice()}>Roll Dice</button>
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

