import React, { Component } from 'react';
import AboutPanel from './panels/AboutPanel';
import AccountsPanel from './panels/AccountsPanel';
import ContractsPanel from './panels/ContractsPanel';
import HomePanel from './panels/HomePanel';
import MiningPanel from './panels/MiningPanel';
import PeersPanel from './panels/PeersPanel';
import ScriptPanel from './panels/ScriptPanel';
import SendPanel from './panels/SendPanel';

import { 
  createStackNavigator, 
  createAppContainer 
} from 'react-navigation';

const RootStack = createStackNavigator(
  {
    about: AboutPanel,
    accounts: AccountsPanel,
    contracts: ContractsPanel,
    home: HomePanel,
    mining: MiningPanel,
    peers: PeersPanel,
    script: ScriptPanel,
    send: SendPanel
  },
  {
    initialRouteName: 'home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
