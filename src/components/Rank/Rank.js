import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div className='mw4 mw6-ns center tc'>
      <p className='f3 black'>
        <em>{name}</em>, you've used <em>{entries}</em> detections
      </p>
      <div className='pa1 br2 bg-black o-40' />
    </div>
  );
}

export default Rank;