import './App.css';
import Hero from './component/Hero';
import Menu from './component/Menu';
 
function App() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-500">
        Welcome to My Restaurant App!
        <Hero/>
        <Menu/>
      </h1>
    </div>
  );
}

export default App;

