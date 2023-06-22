// TODO May not need App.css
import './App.css';
// TODO Consider: https://stackoverflow.com/a/29722646
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'

function App() {
  return (
    <div>
      <div className='flex'>
        <div className='ma2 mt dib'>
          <Logo />
        </div>
        <div className="navFlexSpacer"></div>
        <div className='flex justify-end pr2'>
          <Navigation />
        </div>
      </div>
      <ImageLinkForm />
      <FaceRecognition />
    </div>
  );
}

export default App;
