import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Top from './screens/Top.js';
import NavBar from './components/NavBar.js';
import Quiz from './screens/Quiz.js';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Top} />
          <Route path="/quiz" component={Quiz} />
          <Route render={() => <h4>not found...</h4>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
