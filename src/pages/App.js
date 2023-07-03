import React from 'react';
// TODO May not need App.css
import './App.css';
// TODO Consider: https://stackoverflow.com/a/29722646
import Navigation from '../components/Navigation/Navigation.js'
import Logo from '../components/Logo/Logo.js'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js'
import Rank from '../components/Rank/Rank.js'
import SignIn from '../components/SignIn/SignIn.js'
import Register from '../components/Register/Register.js'

// Also in login and register components
const SERVER = 'https://facedetectionapi.onrender.com';
// const SERVER = 'http://localhost:3001';

const initialState = {
  input: '',
  imageURL: '',
  boundingBoxes: [],
  // TODO display user feedback
  userFeedback: '',
  route: 'signin',
  user: {
    id: 0,
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {

  // App State constructor
  constructor() {
    super()
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  onSubmitDetect = async () => {
    try {
      const url = this.state.input;
      this.setState({ imageURL: url });

      // Check periodically for image to render then get dimensions
      // NOTE: Should be using something like flushSync, or useEffect
      await this.delay(200);
      let image = document.getElementById('inputImage');
      while (image === null) {
        await this.delay(200);
        image = document.getElementById('inputImage');
      }
      if (image.width < 20 || image.height < 20) {
        this.setState({ userFeedback: 'Bad Image' })
        return;
      }

      // Send image dimensions and URL to our server. 
      // Get back a bounding box.
      const clarifaiResponse = await fetch(SERVER + '/facedetect', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url,
          height: image.height,
          width: image.width
        })
      })

      // Check reply for bounding boxes, increment count, and render
      if (clarifaiResponse.status === 200) {
        const boundingBoxes = await clarifaiResponse.json();
        this.setState({ boundingBoxes: boundingBoxes });
        // Image and BoundingBoxes appear good, so increment detection
        const detectResponse = await fetch(SERVER + '/detect', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        });
        const jsonDetectResponse = await detectResponse.json();
        // Copy existing user properties, only update entries
        this.setState(Object.assign(this.state.user, { entries: jsonDetectResponse }));
      }
      else {
        this.setState({ userFeedback: 'Clarifai API error' })
      }
    }
    catch (error) {
      this.setState({ userFeedback: 'Clarifai API error' })
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  logOut = () => {
    this.setState(initialState);
    this.onRouteChange('signin');
  }

  // Triggered component sends a new route
  onRouteChange = (newRoute) => {
    this.setState({ route: newRoute });
  }

  render() {
    // Deconstruct some items so we don't keep typing this.state
    const { user, route, imageURL, boundingBoxes } = this.state;
    return (
      <div>
        <header className='flex'>
          <Logo />
          <div style={{ flexGrow: '1' }} />
          {
            route === 'home'
              ? <Navigation logOut={this.logOut} />
              : <div />
          }
        </header>
        {
          route === 'signin'
            ? <SignIn
              SERVER={this.SERVER}
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser} />
            : (route === 'register'
              ? <Register
                SERVER={this.SERVER}
                onRouteChange={this.onRouteChange} />
              : <section>
                <Rank
                  name={user.name}
                  entries={user.entries} />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onSubmitDetect={this.onSubmitDetect} />
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