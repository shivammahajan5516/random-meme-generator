import './App.css';
import Meme from './components/Meme';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="last">


      <div className='main-div'>

        <Navbar />
        <Meme />
      </div>
    </div>
  )
}

export default App;
