//frontend/src/App.tsx
import Calculator from './Calculator';
import './App.css';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
       <Header/>
      <Calculator />
    </div>
  );
}

export default App;