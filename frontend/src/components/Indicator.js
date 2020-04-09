import React from 'react';

const indicator = props => {
  const style = {
    backgroundColor: 'red',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    display: 'inline-block',
    width: '20%'
  };
  
  return (<div style={style}>
          <h1>{props.number}</h1>
          <h4>{props.text}</h4>
          </div>)
};

export default indicator
