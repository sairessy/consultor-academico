// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import firebase from './src/firebase';

// Screens
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';
import PasswordRecovery from './src/screens/PasswordRecovery';
import Prefetch from './src/screens/Prefetch';

export default function App() {

  const [screenId, setScreenId] = useState(-1);

  const goToScreen = (id) => {
    setScreenId(id);
  }

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      {screenId == -1 ? <Prefetch goToScreen={goToScreen} screenId={screenId} /> : null}
      {screenId == 0 ? <Home goToScreen={goToScreen} screenId={screenId} /> : null}
      <Login goToScreen={goToScreen} screenId={screenId} />
      <SignUp goToScreen={goToScreen} screenId={screenId} />
      {screenId == 3 ? <Profile goToScreen={goToScreen} screenId={screenId} /> : null}
      <PasswordRecovery goToScreen={goToScreen} screenId={screenId} />
    </View>
  );
}