
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddEditScreen from './src/screens/AddEditScreen';
import { ItemType } from './src/components/ListItem';
import LogIn from './src/screens/LogIn';
import { Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamList = {
  LogIn: undefined;
  Home: undefined;
  AddEdit: { item?: ItemType;  onSave ?: (item: ItemType) => void };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />

        {/* Use the callback form of options to get navigation */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Logout"
                onPress={() => {
                  Alert.alert('Logout', 'Are you sure you want to logout?', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Yes',
                      style: 'destructive',
                      onPress: async () => {
                        try {
                          await AsyncStorage.removeItem('loggedInData');
                          await AsyncStorage.removeItem('items');
                          navigation.replace('LogIn');
                        } catch (e) {
                          console.log(e);
                        }
                      },
                    },
                  ]);
                }}
              />
            ),
          })}
        />

        <Stack.Screen name="AddEdit" component={AddEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// yarn add \
// @react-native-async-storage/async-storage \
// @react-navigation/native \
// @react-navigation/native-stack \
// react-native-gesture-handler \
// react-native-safe-area-context \
// react-native-screens


//yarn add react-native-worklets


