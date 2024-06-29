import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.header}>Send and Receive Money Securely</Text>
        <Text style={styles.text}>
          Our peer-to-peer transaction app makes it easy to send and receive
          money with friends, family, and businesses.
        </Text>
        <Pressable
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'semibold'}}>
            Get Started
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CACACA',
    height: '100%',
    width: '100%',
    padding: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    // fontFamily: 'Poppins-Regular',
  },
  text: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
  },
  primaryBtn: {
    minHeight: 48,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e10531',
    marginTop: 20,
  },
});
