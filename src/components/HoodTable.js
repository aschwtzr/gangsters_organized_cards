import React from 'react';
import { hoodIntimiditation } from '../simulation/player'

export default function HoodTable(props) {
  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Nationality</th>
          <th>Salary</th>
          <th>Guns</th>
          <th>Fists</th>
          <th>Intelligence</th>
          <th>Intimidation</th>
          {props.action ? <th>Action</th> : null}
        </tr>
      </thead>
      <tbody>
        {props.hoods.map(hood => {
          return (<tr key={`hood_table_${hood.gId}`}>
                    <td>{hood.name.first} {hood.name.last}</td>
                    <td>{hood.dob.age}</td>
                    <td>{hood.nat}</td>
                    <td>${hood.salary}</td>
                    <td>{hood.guns}</td>
                    <td>{hood.fists}</td>
                    <td>{hood.intelligence}</td>
                    <td>{hoodIntimiditation(hood.guns, hood.fists, hood.intelligence)}</td>
                    {props.action ? <td><button onClick={() =>props.action(hood.gId)}>{props.buttonTitle(hood.gId)}</button></td> : null}
                  </tr>)
        })}
      </tbody>
    </table>
  )
}