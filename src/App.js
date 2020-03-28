
import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Home from "./Components/Home";
import Form from "./Components/Form"

function App() {
  return (
    <>
    <div className="App">
      {/* <Form></Form> */}
      <Route exact path="/" component={Home}/>
      <Route path="/pizza" component={Form}/>
    </div>
    </>
  );
}

export default App;