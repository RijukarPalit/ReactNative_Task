import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet,Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../../App";
import { StackActions } from '@react-navigation/native'; 

const regData = [
  { name: "ansnamn", email: "sdsmk@gmail.com", pass: "nan" },
  { name: "john", email: "john@gmail.com", pass: "123" },
  // { name: "abc", email: "abc@gmail.com", pass: "123456" },
];

type Props = NativeStackScreenProps<RootStackParamList, 'LogIn'>;

export default function LogIn({ navigation }: Props) {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    (async () => {
      // Store registrationData only first time
      const stored = await AsyncStorage.getItem('registrationData');
      if (!stored) {
        await AsyncStorage.setItem('registrationData', JSON.stringify(regData));
      }

      // Check if already logged in
      const loggedIn = await AsyncStorage.getItem('loggedInData');
      if (loggedIn) {
        navigation.replace('Home'); // already logged in
      }
    })();
  }, []);

  const handleLogin = async () => {
    try {
      const usersJson = await AsyncStorage.getItem('registrationData');
      if (!usersJson) return;
      const users = JSON.parse(usersJson);

      const user = users.find(
        (u: any) => u.email === email && u.pass === pass
      );
      if (!user) {
        Alert.alert('Invalid credentials');
        return;
      }

      // Save logged in user
      await AsyncStorage.setItem('loggedInData', JSON.stringify(user));
      // navigation.replace('Home'); // navigate to Home
       navigation.dispatch(StackActions.replace('Home'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        //label = 'Email'
        style={styles.input}
          label="Name"
        placeholder="Name"
        onChangeText={setName}
        value={name}
        placeholderTextColor={'#333'}
      />
      <TextInput
        label = 'Email'
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={'#333'}
      />
      <TextInput
      label = 'Password'
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPass}
        value={pass}
        placeholderTextColor={'#333'}
        // textcolor = {'#333'}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
  },
});
