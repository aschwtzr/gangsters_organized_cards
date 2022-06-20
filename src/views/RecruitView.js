import React from 'react';
import Hood from '../components/Hood.js';

export default function RecruitBoard(props) {
  const recruits = Object.values(props.availableRecruits)
  return (
    <div>
      <div>{props.name}</div>
      {recruits.length ? 
      <div>
        {recruits.map((data, idx) => {
          return <Hood key={`recruit_board_hood_${data.gId}`} info={data} recruit={() => props.recruit(data)} player={props.player} />
        })}
      </div> : <div />}
      <button onClick={() => props.fetchRecruits()}>Get New Roster</button>
    </div>
  )
}