import React from 'react';
// TODO May not need App.css
import './App.css';
// TODO Consider: https://stackoverflow.com/a/29722646
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Rank from './components/Rank/Rank.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'

class App extends React.Component {

  // App State constructor
  constructor() {
    super()
    this.state = {
      input: '',
      imageURL: '',
      boundingBoxes: [],
      // TODO display user feedback
      userFeedback: '',
      route: 'signin'
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

  // Convert percentages to pixel locations of image bounding boxes
  calculateFaceLocation(box) {
    const image = document.getElementById('inputImage');
    return {
      leftCol: Math.round(box.left_col * image.width),
      topRow: Math.round(box.top_row * image.height),
      rightCol: Math.round(image.width - (box.right_col * image.width)),
      bottomRow: Math.round(image.height - (box.bottom_row * image.height))
    }
  }

  onInputChange = (event) => {
    // The second arg to setState executes once the asynchronous first part has completed
    // this.setState({ input: event.target.value }, () => console.log(this.state.input));
    this.setState({ input: event.target.value });
  }

  onSubmit = async () => {
    const url = this.state.input;

    // TODO check if valid image exists
    this.setState({ imageURL: url });

    try {
      const response = await fetch("https://api.clarifai.com/v2/models/face-detection/outputs",
        this.generateClarifaiRequest(url));
      const jsonResponse = await response.json();

      // For all bounding boxes found in the json, convert them into calculated objects and put into array
      try {
        const boundingBoxes = jsonResponse.outputs[0].data.regions.map(region => {
          return this.calculateFaceLocation(region.region_info.bounding_box);
        });
        this.setState({ boundingBoxes: boundingBoxes });
      }
      catch (error) {
        this.setState({ userFeedback: 'No faces found' })
      }
    }
    catch (error) {
      this.setState({ userFeedback: 'Clarifai API error' })
    }
  }

  // Triggered component sends a new route
  onRouteChange = (newRoute) => {
    this.setState({ route: newRoute });
  }

  render() {
    // Deconstruct some items so we don't keep typing this.state
    const {route, imageURL, boundingBoxes} = this.state;
    return (
      <div>
        <header className='flex'>
          <Logo />
          <div style={{ flexGrow: '1' }} />
          {
            route === 'home'
              ? <Navigation onRouteChange={this.onRouteChange} />
              : <div />
          }
        </header>
        {
          route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : (route === 'register'
              ? <Register onRouteChange={this.onRouteChange} />
              : <section>
                <Rank />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onSubmit={this.onSubmit} />
                <FaceRecognition
                  imageURL={imageURL}
                  boundingBoxes={boundingBoxes} />
              </section>
            )
        }
      </div>
    );
  }
}

export default App;