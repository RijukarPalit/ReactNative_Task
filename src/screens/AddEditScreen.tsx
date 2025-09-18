
import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import CustomTextInput from '../components/CustomTextInput';
import { ItemType } from '../components/ListItem';
import CustomButton from '../components/CustomButton';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, 'AddEdit'>;

export default function AddEditScreen({ route, navigation }: Props) {
  const { item, onSave } = route.params;

  const[items,setItems] = useState<ItemType[]>([])

  const [name, setName] = useState(item?.name || '');
  const [age, setAge] = useState<number>(item?.age || 0);
  const [gender, setGender] = useState(item?.gender || '');
  const [mobile, setMobile] = useState<number>(item?.mobile || 0); 

  const validateMobile = (value: string) => /^[0-9]{10}$/.test(value);
  const validateAge =(value: string) => /^\d{1,2}(\.\d{1,2})?$/.test(value);


    // Save list whenever items change
    // useEffect(() => {
    //   (async () => {
    //     try {
    //       await AsyncStorage.setItem('items', JSON.stringify(items));
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   })();
    // }, [items]);

  // const handleSave = () => {
  //   if (!validateMobile(mobile)) {
  //     Alert.alert('Invalid Mobile', 'Mobile number must be exactly 10 digits');
  //     return;
  //   }
  //   if (!validateAge(age)) {
  //     Alert.alert('Invalid Age', 'Age must be a number up to two decimals');
  //     return;
  //   }

  //   const updated: ItemType = {
  //     id: item?.id || '',
  //     name,
  //     age,
  //     gender,
  //     mobile,
     
  //   };
  //   onSave(updated);
  //   navigation.goBack();
  // };

  const handleSave = async () => {
  if (!validateMobile(mobile.toString())) {
    Alert.alert('Invalid Mobile', 'Mobile number must be exactly 10 digits');
    return;
  }
  if (!validateAge(age.toString())) {
    Alert.alert('Invalid Age', 'Age must be a number up to two decimals');
    return;
  }

  try {
    const storedItems = await AsyncStorage.getItem('items');
    let items: ItemType[] = storedItems ? JSON.parse(storedItems) : [];

    // if editing, replace; if new, add
    if (item?.id) {
      items = items.map(i => (i.id === item.id ? { ...i, name, age, gender, mobile } : i));
    } else {
      const newItem: ItemType = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        age,
        gender,
        mobile,
      };
      items.push(newItem);
    }

    await AsyncStorage.setItem('items', JSON.stringify(items));
    console.log('Item saved successfully' + items);
    navigation.goBack(); // back to HomeScreen
  } catch (e) {
    console.log(e);
  }
};


  return (
    <View style={styles.container}>
      <CustomTextInput
        label="Name"
        placeholder="Enter your Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={'#333'}
      />

      <CustomTextInput
        label="Mobile Number"
        placeholder="Enter your Mobile Number"
        value={mobile}
        keyboardType="numeric"
        maxLength={10}
        onChangeText={setMobile}
        placeholderTextColor={'#333'}
      />

      <CustomTextInput
        label="Age"
        placeholder="Enter your Age"
        value={age}
        keyboardType="decimal-pad"
        onChangeText={setAge}
        placeholderTextColor={'#333'}
      />

      <CustomTextInput
        label="Gender"
        placeholder="Enter your Gender"
        value={gender}
        onChangeText={setGender}
        placeholderTextColor={'#333'}
      />

      <CustomButton title={item ? 'Update' : 'Save'} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});