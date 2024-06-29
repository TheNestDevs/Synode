/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './screens/Auth';
import P2PConnection from './utils/p2pConnections';


function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <Login />
      <Pressable style={styles.pressable} onPress={P2PConnection.instance().startPeerDiscovery}><Text>SPD</Text></Pressable>
      <Pressable style={styles.pressable} onPress={P2PConnection.instance().getAvailablePeers}><Text>GAP</Text></Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  }
});

export default App;