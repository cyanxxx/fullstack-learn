import { NativeRouter } from 'react-router-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/components/Main';

export default function App() {
  console.log('App work.')
  return (
    <NativeRouter>
      <Main></Main>    
    </NativeRouter>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
