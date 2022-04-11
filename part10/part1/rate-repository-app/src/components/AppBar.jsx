import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage'
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useHistory } from 'react-router-native';

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
  const authStorage = useAuthStorage();
  const [me, setMe] = useState(null)
  const { data, error, loading } = useQuery(ME)
  const history = useHistory()
  const handleLogout = () => {
    setMe(null)
    authStorage.removeAccessToken()
    history.push('/')
  }
  useEffect(() => {
    if(data && data.me) {
      setMe(data.me)
    }
  }, [data])
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {me? (
          <Pressable onPress={handleLogout}>
           <Text style={styles.text}>Logout</Text>
          </Pressable>
        ): (
          <Link to="/sign">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
        
      </ScrollView> 
    </View>
  );
};

export default AppBar;