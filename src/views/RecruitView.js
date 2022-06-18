import React from 'react';
import Hood from '../components/Hood.js';
import { randomHood } from '../simulation/utilities'

export default function RecruitBoard(props) {
  const [availableRecruits, setAvailableRecruits] = React.useState([])
  React.useEffect(() => {
    const fetchHoodInfo = async () => { 
      await fetchRecruits()
    }
    fetchRecruits()
  }, [])


  const fetchRecruits = async () => {
    const promises = [...Array(3)].map(async (_, idx) => {
      return randomHood()
    })
    const hoods = await Promise.all(promises)
    const objectMap = hoods.reduce((prev, curr) => {
    })
    console.log(hoods)
    setAvailableRecruits(hoods)
    return hoods
  }

  return (
    <div>
      <div>{props.name}</div>
      {availableRecruits.length ? 
      <div>
        {availableRecruits.map(data => {
          return <Hood key={`${data.id.name}_${data.id.value}`} recruit={() => props.recruit(data)} />
        })}
      </div> : <div />}
      <button onClick={() => fetchRecruits()}>Get New Roster</button>
    </div>
  )
}