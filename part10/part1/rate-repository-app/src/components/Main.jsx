import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar'
import { Route, Switch, Redirect } from 'react-router-native';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import MyReview from './MyReview';

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
          <SingleRepository />
        </Route>
        <Route path="/review/create">
          <CreateReview />
        </Route>
        <Route path="/review/me">
          <MyReview />
        </Route>
        <Route path="/sign">
          <SignIn />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;