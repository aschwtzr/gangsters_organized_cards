import React from 'react';
import RecruitView from './views/RecruitView';
import BoardView from './views/BoardView';
import CityView from './views/CityView';
import { randomHood } from './simulation/utilities';

export function Board({ ctx, G, moves }) {
  const [selectedBlock, setSelectedBlock] = React.useState(null)
  const [currentView, setCurrentView] = React.useState('')

  React.useEffect(() => {
    fetchRecruits()
  }, [])

  const fetchRecruits = async () => {
    const promises = [...Array(3)].map(async (_, idx) => {
      return randomHood()
    })
    const hoods = await Promise.all(promises)
    moves.setAvailableRecruits(hoods)
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

  const recruitView = <RecruitView recruit={(hood) => moves.recruitHood(hood)} name={'one'} key={'one'} availableRecruits={G.availableRecruits} player={G[ctx.currentPlayer]} />
  const boardView = <BoardView selectedBlock={selectedBlock} currentMoves={G[ctx.currentPlayer].moves} currentPlayer={G[ctx.currentPlayer]} key={'two'}/>
  const hqView = <BoardView selectedBlock={selectedBlock} currentMoves={G[ctx.currentPlayer].moves} currentPlayer={G[ctx.currentPlayer]} key={'three'}/>

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

