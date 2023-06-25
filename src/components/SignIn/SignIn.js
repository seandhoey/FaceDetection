import React from 'react';

// Template from: https://tachyons.io/components/forms/sign-in/index.html
const SignIn = ({ onRouteChange }) => {
  return (
    <main className='mw6-l mw5-ns center bg-white br3 pa2-l pa1-ns mv2 ba b--black-10'>
      <div className='pa4 black-80 measure center'>
        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
          <legend className='f4 fw6 ph0 mh0'>Log In</legend>
          <div className='mt2'>
            <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
            <input className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='email' name='email-address' id='email-address' />
          </div>
          <div className='mv3'>
            <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
            <input className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='password' name='password' id='password' />
          </div>
        </fieldset>
        <hr className='mw4 bb bw1 b--black-10' />
        <div className='flex'>
          <input
            className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib'
            type='submit'
            onClick={() => onRouteChange('home')}
            value='Log In' />
          <div style={{ flexGrow: '1' }} />
          <p onClick={() => onRouteChange('register')} className='f5 link dim black db pointer'>Register</p>
        </div>
      </div>
    </main>
  );
}

export default SignIn;