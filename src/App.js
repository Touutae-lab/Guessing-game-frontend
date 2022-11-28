import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const [state, setState] = useState()
class App extends React.Component {
  render() {
    return (<toolbar key={state}/>);
  }
}

const toolbar = (
    <div className="App">
      <div className='Container'>
        <div> Data </div>
      </div>
    </div>
  );


export default App;
