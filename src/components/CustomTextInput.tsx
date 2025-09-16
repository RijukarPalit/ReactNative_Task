import React from 'react';
import { TextInput, TextInputProps, View, Text, StyleSheet } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string; // Optional label for the input
 
  icon?: React.ReactNode; // Optional icon component
  // Add any other custom props you need
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, icon, ...rest }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
       
      <View style={styles.inputWrapper}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input]} // Apply custom style and inherited styles
          {...rest} // Spread remaining native TextInputProps
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomTextInput;