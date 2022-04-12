import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar'
import { Route, Switch, Redirect } from 'react-router-native';
import { RouteRepositoryItem } from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar></AppBar>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repository/:id">
          <RouteRepositoryItem />
        </Route>
        <Route path="/sign">
          <SignIn />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;