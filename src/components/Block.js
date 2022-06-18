import React from 'react';

export default function Block(props) {
  const [illegalBusiness, setIllegalBusiness] = React.useState({});
  const [defensePoints, setDefensePoints] = React.useState(0)

  let color = ''
  switch(props.type) {
    case 'Commercial':
      color = 'blue'
      break
    case 'Residential':
      color = 'green'
      break
    case 'Industrial':
      color = 'red'
      break
  }

  const cellStyle = {
    border: '3px solid #555',
    width: '90px',
    height: '90px',
    textAlign: 'left',
    backgroundColor: 'white',
    fontSize: 11,
    margin: '.1rem',
  };

  const blockIncome = props.stores.reduce((sum, curr) => (sum += curr.income), 0)
  return(
    <td key={props.id}>
      <div style={{...cellStyle, ...{ color: color, borderColor: color }}} onClick={() => props.selectBlock()}>
        <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '.25rem', padding: '.25rem'}}>
          <div>{props.type}</div>
          <div>Income: ${blockIncome}</div>
          <div>Owner {props.ownwer}</div>
        </div>
      </div>
    </td>
  )
}