import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Picker, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, IconButton, TextInput } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';

import CONFIG from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateProfile({ toggleUpdateProfilePopup }) {
	const [fullName, setFullName] = useState('');
	const [course, setCourse] = useState('0');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [zone, setZone] = useState('0');
	const [institution, setInstitution] = useState('0');
	const [level, setLevel] = useState('0');
	const [img, setImg] = useState({ url: '', name: '' });
	const [newImg, setNewImg] = useState({});

	const [imgBlob, setImgBlob] = useState('');
	const [imgUri, setImgUri] = useState('');

	const displayPhoto = async () => {
		const accepted = ['png', 'jpg', 'jpeg'];

		const result = await ImagePicker.launchImageLibraryAsync();

		if (!result.cancelled) {
			const uri = result.uri;
			const response = await fetch(uri);
			const blob = await response.blob();
			const ext = blob.type.split('/')[1];
			if (!accepted.includes(ext)) {
				alert('A extensão do ficheiro não é suportada!');
			}
			console.log(blob)
			setImgBlob(blob);
			setImgUri(uri);
		}
	}

	const getUserInfo = async () => {
		const tokken = await AsyncStorage.getItem('tokken');
		const response = await fetch(CONFIG.server + '/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ tokken })
		});

		const json = await response.json();
		const user = json[0];

		setFullName(user.fullName);
		setCourse(user.course);
		setEmail(user.email);
		setPhoneNumber(user.phoneNumber);
		setZone(user.zone);
		setInstitution(user.institution);
		setLevel(user.level);
	}

	const updateProfile = async () => {
		const data = {
			fullName,
			course,
			email,
			phoneNumber,
			zone,
			institution,
			level,
			img,
			tokken: await AsyncStorage.getItem('tokken')
		}

		const response = await fetch(CONFIG.server + '/updateprofile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const json = await response.json();

		if (json.success) {
			// _getUserInfo();
			alert('Perfil actualizado!');
		}

	}

	const uploadPhoto = () => {

	}

	useEffect(() => {
		getUserInfo();
	}, [])

	return (
		<View style={{ flex: 1 }}>

			<TouchableOpacity
				onPress={() => displayPhoto()}
				style={{
					height: 130, backgroundColor: '#ddd',
					justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 0, borderBottomLeftRadius: 0,
				}}>
				<Ionicons name='arrow-back' size={20} style={{ margin: 5, position: 'absolute', top: 0, left: 0 }}
					onPress={() => toggleUpdateProfilePopup()}
				/>

				<View style={{ backgroundColor: '#aaa', borderRadius: '100%', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
					{imgUri == '' ?
						<Ionicons name='person' color='#eee' size={15} /> :
						<Image source={{ uri: imgUri }} style={{ width: 50, height: 50 }} />
					}
				</View>
			</TouchableOpacity>

			<ScrollView style={{ padding: 5 }}>
				<TextInput activeOutlineColor={CONFIG.colors.primary} style={{ backgroundColor: '#fff' }} value={fullName} mode='outlined' placeholder='Nome' label='Introduza o nome' onChangeText={text => setFullName(text)} />
				<TextInput activeOutlineColor={CONFIG.colors.primary} style={{ backgroundColor: '#fff' }} value={phoneNumber} mode='outlined' placeholder='Contacto' label='Introduza o contacto' onChangeText={text => setPhoneNumber(text)} />
				<TextInput activeOutlineColor={CONFIG.colors.primary} style={{ backgroundColor: '#fff' }} value={email} mode='outlined' placeholder='Email' label='Introduza o email' onChangeText={text => setEmail(text)} />

				<Picker
					style={{ padding: 10, marginTop: 5, borderWidth: 0, backgroundColor: '#eee', borderRadius: 3 }}
					selectedValue={institution}
					onValueChange={(itemValue, itemIndex) =>
						setInstitution(itemValue)
					}>
					{CONFIG.institutions.map(i => (
						<Picker.Item label={i.label} value={i.id} key={i.id} />
					))}
				</Picker>

				<Picker
					style={{ padding: 10, marginTop: 5, borderWidth: 0, backgroundColor: '#eee', borderRadius: 3 }}
					selectedValue={course}
					onValueChange={(itemValue, itemIndex) =>
						setCourse(itemValue)
					}>
					{CONFIG.courses.map(c => (
						<Picker.Item label={c.label} value={c.id} key={c.id} />
					))}
				</Picker>

				<Picker
					style={{ padding: 10, marginTop: 5, borderWidth: 0, backgroundColor: '#eee', borderRadius: 3 }}
					selectedValue={zone}
					onValueChange={(itemValue, itemIndex) =>
						setZone(itemValue)
					}>
					{CONFIG.zones.map(z => (
						<Picker.Item label={z.label} value={z.id} key={z.id} />
					))}
				</Picker>

				<Picker
					style={{ padding: 10, marginTop: 5, borderWidth: 0, backgroundColor: '#eee', borderRadius: 3 }}
					selectedValue={level}
					onValueChange={(itemValue, itemIndex) =>
						setLevel(itemValue)
					}>
					{CONFIG.levels.map(l => (
						<Picker.Item label={l.label} value={l.id} key={l.id} />
					))}
				</Picker>

				<Button mode='contained' labelStyle={{ textTransform: 'capitalize' }}
					style={{ marginTop: 10, backgroundColor: CONFIG.colors.primary }}
					onPress={() => updateProfile()}
				>
					Actualizar
				</Button>
			</ScrollView>


		</View>
	);
}