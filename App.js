import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Screens
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';
import PasswordRecovery from './src/screens/PasswordRecovery';

export default function App() {

  const [screenId, setScreenId] = useState(0);

  const goToScreen = (id) => {
    setScreenId(id);
  }

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusbarHeight }}>
      {screenId == 0 ? <Home goToScreen={goToScreen} screenId={screenId} /> : null}
      <Login goToScreen={goToScreen} screenId={screenId} />
      <SignUp goToScreen={goToScreen} screenId={screenId} />
      {screenId == 3 ? <Profile goToScreen={goToScreen} screenId={screenId} /> : null}
      <PasswordRecovery goToScreen={goToScreen} screenId={screenId} />
    </View>
  );
}