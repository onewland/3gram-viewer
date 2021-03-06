import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Leaderboard from './Leaderboard.js';
import ThreeGram from './ThreeGram.js';
import Vote from './Vote'
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/view" component={ThreeGramInst} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/vote" component={Vote} />
    </Router>

  );
}

function Home() {
  return (
    <div className="container-fluid">
      <div className="row"> 
        <div className="center col">
          <p>💯/3</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ol className="center" style={{alignItems: "center"}}>
            <li><Link to="/vote">Vote</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/view">Display</Link></li>
          </ol>
        </div>
      </div>
    </div>
  )
}


function ThreeGramInst() {
  return (
    <div class="page">
      <div className="container-fluid">
        <ThreeGram />
      </div>
      <div className="floater-voter">
        <p>Vote for me: http://100over3.com/</p>
      </div>
    </div>
  );
}

export default App;
