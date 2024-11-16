import './App.css';
import Hero from './component/Hero';
 
import Navbar from './component/Navbar';
 
function App() {
  return (
    <div className="text-center">
      <Navbar  className="fixed"/>
      <h1 className="text-4xl font-bold text-blue-500">
      
        <Hero/>
      </h1>
    </div>
  );
}

export default App;

