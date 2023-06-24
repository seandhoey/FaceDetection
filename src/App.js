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
      imageURL: '',
      boundingBoxes: []
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

  calculateFaceLocation(box) {
    const image = document.getElementById('inputImage');
    console.log(image.width)
    console.log(image.height)
    console.log(box.right_col)
    console.log(box.bottom_row)
    return {
      leftCol: Math.round(box.left_col * image.width),
      topRow: Math.round(box.top_row * image.height),
      rightCol: Math.round((box.right_col * image.width)),
      bottomRow: Math.round((box.bottom_row * image.height))
    }
  }

  onInputChange = (event) => {
    // The second arg to setState executes once the asynchronous first part has completed
    // this.setState({ input: event.target.value }, () => console.log(this.state.input));
    this.setState({ input: event.target.value });
  }

  onSubmit = async () => {
    const exts = ['.jpeg', '.jpg', '.png', '.tiff', '.bmp', '.webp'];
    const url = this.state.input;

    // Continue only if URL contains an image extension
    if (exts.some(ext => url.toLowerCase().includes(ext))) {
      const response = await fetch("https://api.clarifai.com/v2/models/face-detection/outputs", 
        this.generateClarifaiRequest(url));
      const jsonResponse = await response.json();
      
      // TODO check if valid image exists
      // We set the image first, so we can reference its width & height
      // The second arg to setState executes once the asynchronous first part has completed
      this.setState({ imageURL: url }, () => {
        // TODO check if bounding boxes exist
        // For all bounding boxes found in the json, convert them into calculated objects and put into array
        const boundingBoxes = jsonResponse.outputs[0].data.regions.map(region => { 
          return this.calculateFaceLocation(region.region_info.bounding_box);
        });
        // TODO image load delay is causing bounding boxes not to calculate
        // Pre-calc image width/height?
        this.setState({ boundingBoxes: boundingBoxes });
      });
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
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit} />
          <FaceRecognition
            imageURL={this.state.imageURL} 
            boundingBoxes={this.state.boundingBoxes} />
        </section>
      </div>
    );
  }
}

export default App;