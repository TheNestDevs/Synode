import React from 'react';
import {SafeAreaView, Text, View, Pressable} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';

export default function Login(): React.JSX.Element {
  const [userState, setUserState] = React.useState({
    userInfo: undefined as User | undefined,
    error: undefined,
  });

  const onGoogleSignIn = async () => {
    try {
      await GoogleSignin.configure({
        webClientId:
        '716159749536-n3s97ghkaqggaklrsfbe4mf2s103runo.apps.googleusercontent.com',
        offlineAccess: true,
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('token', userInfo.idToken);
      setUserState({userInfo, error: undefined});
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('User cancelled the sign in flow');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Sign in is in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play Services not available');
            break;
          default:
            console.log('Something went wrong', error);
        }
      } else {
        console.log('Error', error);
      }
    }
  };

  return (
    <SafeAreaView>
      <GoogleSigninButton onPress={onGoogleSignIn} />
      <Text>
        {userState.userInfo
          ? `Hello, ${userState.userInfo.user.name}!`
          : 'Please sign in'}
      </Text>
    </SafeAreaView>
  );
}
