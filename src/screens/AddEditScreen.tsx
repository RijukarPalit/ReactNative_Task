
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import CustomTextInput from '../components/CustomTextInput';
import { ItemType } from '../components/ListItem';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEdit'>;

export default function AddEditScreen({ route, navigation }: Props) {
  const { item, onSave } = route.params;

  const [name, setName] = useState(item?.name || '');
  const [age, setAge] = useState<number>(item?.age || 0);
  const [gender, setGender] = useState(item?.gender || '');
  const [mobile, setMobile] = useState<number>(item?.mobile || 0); // new mobile field

  const validateMobile = (value: string) => /^[0-9]{10}$/.test(value);
  const validateAge =(value: string) => /^\d{1,2}(\.\d{1,2})?$/.test(value);

  const handleSave = () => {
    if (!validateMobile(mobile)) {
      Alert.alert('Invalid Mobile', 'Mobile number must be exactly 10 digits');
      return;
    }
    if (!validateAge(age)) {
      Alert.alert('Invalid Age', 'Age must be a number up to two decimals');
      return;
    }

    const updated: ItemType = {
      id: item?.id || '',
      name,
      age,
      gender,
      mobile,
     
    };
    onSave(updated);
    navigation.goBack();
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
