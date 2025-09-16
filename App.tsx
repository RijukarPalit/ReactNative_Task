import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/HomeScreen';
// import AddEditScreen from './src/screens/AddEditScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddEditScreen from './src/screens/AddEditScreen';
import { ItemType } from './src/components/ListItem';
import LogIn from './src/screens/LogIn';

export type RootStackParamList = {
  LogIn : undefined;
  Home: undefined;
  AddEdit: { item?: ItemType; onSave: (item: ItemType) => void };
};

// export type ItemType = {
//   id: string;
//   name: string;
//   //description: string;
//   age :string;
//   gender : string;
// };

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'LogIn' component={LogIn} />
        <Stack.Screen name="Home" component={HomeScreen} />
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
