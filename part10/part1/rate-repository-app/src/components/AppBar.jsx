import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    display: 'flex',
    paddingBottom : 3,
    color: '#fff'
  },
  scrollContainer: {
    flexDirection: 'row'
  },  
  text: {
    color: '#fff',
    padding: 5
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/sign">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView> 
    </View>
  );
};

export default AppBar;