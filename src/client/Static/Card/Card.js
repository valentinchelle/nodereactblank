import React from 'react';

function Card(props) {
  return (
    <div className={props.className ? props.className : 'card'}>
      {props.children && props.children}
    </div>
  );
}

export default Card;
