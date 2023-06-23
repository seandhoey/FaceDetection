// TODO May not need App.css
import './App.css';
// TODO Consider: https://stackoverflow.com/a/29722646
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Rank from './components/Rank/Rank.js'


function App() {
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
        <ImageLinkForm />
        <FaceRecognition />
      </section>
    </div>
  );
}

export default App;
