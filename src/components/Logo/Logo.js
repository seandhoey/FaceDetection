import React from 'react';
import Tilt from 'react-parallax-tilt';
import logo from './logo.png'

const Logo = () => {
  return (
    <div className='ma2 dib'>
      <Tilt>
        {/* TODO Make image a button. 
        On click, change background random gradient */}
        {/* TODO On click, make image transition spin around? */}
        <img alt='Logo' style={{width:'150px', cursor:'pointer'}} src={logo} />
      </Tilt>
    </div>
  );
}

export default Logo;