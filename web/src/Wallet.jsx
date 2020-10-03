import React from 'react';
import './Wallet.css';
import Image from './components/Image'
import AboutPanel from './panels/AboutPanel'
import ContractsPanel from './panels/ContractsPanel'
import ScriptPanel from './panels/ScriptPanel'
import AccountsPanel from './panels/AccountsPanel'
import MiningPanel from './panels/MiningPanel'
import PeersPanel from './panels/PeersPanel'
import SendPanel from './panels/SendPanel'
import reciprocity_logo from 'shared/img/reciprocity_logo.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Wallet extends React.Component {
  render() {
    return (
      <Router>
        <div className="grid-container">
          <div className="navigation">
            <div className="navigation-header">
              <Image src={reciprocity_logo} alt="Reciprocity" width="75" height="75"/>
              <p>Reciprocity</p>
            </div>
            <ul>
              <li>
                <Link to="/">Accounts</Link>
              </li>           
              <li>         
                <Link to="/Send">Send</Link>   
              </li>
              <li>
                <Link to="/Mining">Mining</Link>
              </li>
              <li>
                <Link to="/Contracts">Contracts</Link>
              </li>
              <li>
                <Link to="/Script">Script</Link>
              </li>
              <li>
                <Link to="/Peers">Peers</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
            </ul>
          </div>
          <div className="content-panel">
            <Route path="/" exact component={AccountsPanel} />
            <Route path="/Send" component={SendPanel} />
            <Route path="/Mining" component={MiningPanel} />
            <Route path="/Contracts" component={ContractsPanel} />
            <Route path="/Script" component={ScriptPanel} />
            <Route path="/Peers" component={PeersPanel} />
            <Route path="/About" component={AboutPanel} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Wallet;
