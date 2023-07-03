import React from 'react';

// Template modified from: https://tachyons.io/components/forms/sign-in/index.html
class Register extends React.Component {

  // App State constructor
  constructor(props) {
    super(props)
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: ''
    }
  }

  // Notice that the "onClick" event in the jsx is not arrow function
  // It's okay if we run the event immediately on page load
  onNameChange = (event) => {
    this.setState({ registerName: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value })
  }

  onSubmitRegister = () => {
    const SERVER = 'https://facedetectionapi.onrender.com';
    // const SERVER = 'http://localhost:3001';

    // TODO validate fields
    fetch(SERVER + '/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
      .then(response => response.json())
      .then(jsonResp => {
        if (jsonResp === 'Registered') {
          this.props.onRouteChange('signin');
        }
        else {
          console.log(jsonResp);
          // TODO display login failure message
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <main className='mw6-l mw5-ns center bg-white br3 pa2-l pa1-ns mv2 ba b--black-10'>
        <div className='pa4 black-80 measure center'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f4 fw6 ph0 mh0'>Register</legend>
            <div className='mt2'>
              <label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
              <input
                onChange={this.onNameChange}
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='text'
                name='name'
                id='name'
              />
            </div>
            <div className='mt2'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
              <input
                onChange={this.onEmailChange}
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='email'
                name='email-address'
                id='email-address'
              />
            </div>
            <div className='mv2'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
              <input
                onChange={this.onPasswordChange}
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                type='password'
                name='password'
                id='password'
              />
            </div>
          </fieldset>
          <hr className='mw4 bb bw1 b--black-10' />
          <div className='flex '>
            <input
            onClick={() => this.onSubmitRegister()}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib'
              type='submit'
              value='Register' />
            <div style={{ flexGrow: '1' }} />
            <p onClick={() => onRouteChange('signin')} className='f5 link dim black db pointer'>Back</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Register;