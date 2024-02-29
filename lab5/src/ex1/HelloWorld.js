import './HelloWorld.css';
import photo from './photo.jpg';


function App() {
  return (
    <div className="Hello-world">
        <h1 className = "App-header">Hello world</h1>
        <img src={photo} className="Photo" alt="photo" />
    </div>
  );
}

export default App;
