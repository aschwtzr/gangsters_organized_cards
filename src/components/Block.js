import React from 'react';

export default function Block(props) {
  const [illegalBusiness, setIllegalBusiness] = React.useState({});
  const [legalBusinesses, setLegalBusinesses] = React.useState([]);

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
    border: '1px solid #555',
    width: '90px',
    height: '90px',
    lineHeight: '70px',
    textAlign: 'center',
  };
  return(
    <td key={props.id}>
      {props.owner ? (
        <div style={{...cellStyle, ...{ color: 'orange', borderColor: color }}}>{`${props.type} (${props.owner})`}</div>
      ) : (
        <button style={{...cellStyle, ...{ color: color, borderColor: color }}} onClick={() => props.onClick(props.id)}>{props.type}</button>
      )}
    </td>
  )
}