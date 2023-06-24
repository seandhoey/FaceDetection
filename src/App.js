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
      input: '',
      successURL: ''
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
    // this.setState({ input: event.target.value }, () => console.log(this.state.input));
    this.setState({ input: event.target.value });
  }

  onSubmit = async () => {
    // When button is clicked, clear image until we have a success
    this.setState({ successURL: '' });

    const exts = ['.jpeg', '.jpg', '.png', '.tiff', '.bmp', '.webp'];

    // If the URL does not contain an image extension, we render nothing
    if (exts.some(v => this.state.input.toLowerCase().includes(v))) {
      // TODO var url = this.state.input;
      var url = 'https://samples.clarifai.com/metro-north.jpg';
      const response = await fetch("https://api.clarifai.com/v2/models/face-detection/outputs", this.generateClarifaiRequest(url));
      const jsonResponse = await response.json();
      // TODO check jsonRepsonse for success, then draw image regardless of bounding box
      // TODO somehow use map function to grab all region objects and put into array
      console.log(jsonResponse.outputs[0].data.regions[0].region_info.bounding_box);
      // TODO update state with an array of bounding boxes?

      // If api response is good, draw new image
      // TODO: check actual api response, and pass image from response
      if (true) {
        this.setState({ successURL: url });
      }
    }
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
          <FaceRecognition successURL={this.state.successURL} />
        </section>
      </div>
    );
  }
}

export default App;