
import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Home from "./Components/Home.js";
import Form from "./Components/Form.js"

function App() {
  return (
    <>
    <div className="App">
      <Form></Form>
      {/* <Route exact path="/" component={Home}/>
      <Route path="/form" component={Form}/> */}
    </div>
    </>
  );
}

export default App;