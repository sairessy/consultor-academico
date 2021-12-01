import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, IconButton } from 'react-native-paper';
import CONFIG from '../../config';

import * as Clipboard from 'expo-clipboard';

export default function Consultor({ fullName, course, zone, institution, contact, disciplinas }) {
  const openWhatsApp = async () => {
    const url = 'https://wa.me/+258' + contact;
    Linking.openURL(url);
  }

  const copyNumber = async () => {
    try {
      Clipboard.setString(contact);
      console.log(contact);
      Alert.alert('', 'Número copiado para área de colagem!', [
        {
          text: '',
          onPress: () => { },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => { } },
      ]);
    } catch (error) {
      Alert.alert('Número:', contact, [
        {
          text: '',
          onPress: () => { },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => { } },
      ]);
    }
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#fff' }}>
      <View style={{ flexDirection: 'row' }}>
        <Ionicons name='person-circle' size={40} color='#ddd' />
      </View>
      <View style={{ backgroundColor: '#fff', flex: 1, padding: 5, borderRadius: 5 }}>
        <Text>{fullName}</Text>
        <Text style={{ fontSize: 11 }}>{CONFIG.courses.filter(c => c.id == course)[0].label} <Text style={{ fontSize: 9 }}>{CONFIG.institutions.filter(i => i.id == institution)[0].label}</Text></Text>
        <Text style={{ fontSize: 11 }}>{CONFIG.zones.filter(z => z.id == zone)[0].label}</Text>
        <View style={{ flexDirection: 'row' }}>
          <IconButton icon='whatsapp' color='#666' size={15} onPress={() => openWhatsApp()} />
          <IconButton icon='message' color='#666' size={15} />
          <IconButton icon='phone' color='#666' size={15} />
          <IconButton icon='content-copy' color='#666' size={15} onPress={() => copyNumber()} />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {disciplinas.map(d => (
            <Text
              key={d.disciplina}
              style={{ borderRadius: 2, fontSize: 8, margin: 5, padding: 5, backgroundColor: '#ddd' }}>
              {CONFIG.disciplinas.filter(ds => ds.id == d.disciplina)[0].label}
            </Text>
          ))}
        </View>
      </View>
      {/* <View>
        <MaterialIcons name='chevron-right' color='#666' size={20} />
      </View> */}
    </View>
  );
}