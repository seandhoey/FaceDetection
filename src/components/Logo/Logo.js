import React from 'react';
import Tilt from 'react-parallax-tilt';
import logo from './logo.png'

const Logo = () => {
  return (
    <div>
      <Tilt>
        {/* TODO Make image a button. 
        On click, change background random gradient */}
        {/* TODO On click, make image transition spin around? */}
        <img alt='Logo' style={{width:'150px'}} src={logo} />
      </Tilt>
    </div>
  );
}

export default Logo;