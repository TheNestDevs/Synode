/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import P2PConnection  from './utils/p2pConnections';

AppRegistry.registerComponent(appName, () => App);
P2PConnection.instance().init();