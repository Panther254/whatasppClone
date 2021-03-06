import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Login';
import { useStateValue}  from './DataStore';

function App() {
  
  const [{ user },] = useStateValue();
  return (
    <div className="App">
     {!user ? (<Login />) :(
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              

              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              
              <Route  path="/">
                <Chat/>
              </Route>

            </Switch>
          </Router>
        </div>)
     }
    </div>
  );
}

export default App;