import React from 'react';
import { TextInput as NativeTextInput, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles, style];

  return (
    <View style={textInputStyle}>
       <NativeTextInput {...props} />
    </View>    
  )
};

export default TextInput;