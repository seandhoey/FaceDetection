import React from 'react';
// TODO May not need App.css
import './App.css';
// TODO Consider: https://stackoverflow.com/a/29722646
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Rank from './components/Rank/Rank.js'


class App extends React.Component {

  // App State constructor
  constructor() {
    super()
    this.state = {
      imgURL: ''
    }
  }

  // Given a URL and the static config, generates a requestOptions object, used in the fetch API
  generateClarifaiRequest(url) {
    const PAT_KEY = '450fdb8a850148248a9815d0e41dc6ae';
    const USER_ID = 'nmvision';
    const APP_ID = 'FaceDetection';

    return {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT_KEY
      },
      body: JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [{
          "data": { "image": { "url": url } }
        }]
      })
    };
  }

  onInputChange = (event) => {
    // The second arg to setState executes once the asynchronous first part has completed
    this.setState({imgURL: event.target.value} , () => console.log(this.state.imgURL));
  }

  onSubmit = () => {
    if(this.state.imgURL !== ""){
      console.log('click');
      // TODO nest the below inside and assign actual imgURL
    }

    var url = 'https://samples.clarifai.com/metro-north.jpg';

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", this.generateClarifaiRequest(url))
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div>
        <header className='flex'>
          <Logo />
          <div style={{ flexGrow: '1' }} />
          <Navigation />
        </header>
        <section>
          <div style={{ height: '10vh' }} />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
          <FaceRecognition />
        </section>
      </div>
    );
  }
}

export default App;