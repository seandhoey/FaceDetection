import React from 'react';

const Navigation = ({ logOut }) => {
  return (
    <nav className='flex'>
      {/* TODO Make into button, does signout functionality */}
      {/* Arrow function required, so that the route change doesnt actually pass a value until onClick happens */}
      <p
        onClick={() => logOut() }
        className='mr3 mt4 mb6 f3 link dim black pointer'>
        Log Out
      </p>
    </nav>
  );
}

export default Navigation;