
import React, { useState, useEffect,useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, Button, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import ListItem from '../components/ListItem';
import { ItemType } from '../components/ListItem';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

const uuid = () => Math.random().toString(36).substring(2, 9);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<ItemType[]>([]);

  // Load saved list data on mount
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('items');
  //       if (jsonValue != null) {
  //         setItems(JSON.parse(jsonValue));
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

    // 🔹 Load saved list data whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('items');
          if (jsonValue != null) {
            setItems(JSON.parse(jsonValue));
          } else {
            setItems([]);
          }
        } catch (e) {
          console.log(e);
        }
      };
      loadItems();
    }, [])
  );


  // // Save list whenever items change
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await AsyncStorage.setItem('items', JSON.stringify(items));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, [items]);

  const handleSave = (item: ItemType) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => (i.id === item.id ? item : i));
      }
      return [...prev, { ...item, id: uuid() }];
    });
  };

  // const handleLogout = async () => {
  //   Alert.alert('Logout', 'Are you sure you want to logout?', [
  //     { text: 'Cancel', style: 'cancel' },
  //     {
  //       text: 'Yes',
  //       style: 'destructive',
  //       onPress: async () => {
  //         try {
  //           await AsyncStorage.removeItem('loggedInData');
  //           await AsyncStorage.removeItem('items'); // clear list data too
  //           navigation.replace('LogIn'); // back to login screen
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       },
  //     },
  //   ]);
  // };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onEdit={() =>
              navigation.navigate('AddEdit', { item, onSave: handleSave })
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items yet</Text>}
      />

      <CustomButton
        title="ADD"
        onPress={() => navigation.navigate('AddEdit', { onSave: handleSave })}
      />

      {/* <View style={{ marginTop: 16 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
});
