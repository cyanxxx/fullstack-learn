import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository'
import * as Linking from 'expo-linking';
import RepositoryItem from './RepositoryItem'
import theme from '../theme';
import { format } from 'date-fns'

const styles = StyleSheet.create({
    githubButton: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.button.borderRadius,
      justifyContent: 'center',
      padding: 10,
      marginTop: 10
    },
    text: {
      color: '#fff'
    }
});

const reviewStyle = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundCard
  },
  card: {
    marginTop: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  avatarContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  value: {
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  infoContainer: {
    flexGrow: 1
  },
  username: {
    fontWeight: 'bold',
    color: theme.colors.textPrimary
  },
  createdAt: {
    color: theme.colors.textSecondary
  },
  text: {
    marginTop: 10
  }
});

const RepositoryInfo = ({ repository }) => {
    const handleNav = () => {
      Linking.openURL(repository.url);
    }
    return (
        <RepositoryItem item={repository}>
            <Pressable onPress={handleNav} style={styles.githubButton}>
            <Text style={styles.text}>
                Open in Github
            </Text>
            </Pressable>
      </RepositoryItem>  
    )
}

const getDateString = (str) => {
  const date = new Date(str)
  return format(date, 'dd.MM.yyyy')
}

const ReviewItem = ({ review }) => {
  return (
    <View style={reviewStyle.container} >
       <View style={reviewStyle.card}>
        <View style={reviewStyle.avatarContainer}>
          <Text style={reviewStyle.value}>{review.rating}</Text>
        </View>
        <View style={reviewStyle.infoContainer}>
          <Text style={reviewStyle.username}>{review.user.username}</Text>
          <Text style={reviewStyle.createdAt}>{getDateString(review.createdAt)}</Text>
          <Text style={reviewStyle.text}>{review.text}</Text>
        </View>
      </View>
    </View>    
  )
};

export function SingleRepository() {
    const { id } = useParams()
    const { repository } = useRepository(id)
    if(!repository)return (<></>)
    const reviews = repository.reviews.edges.map(edge => edge.node)
    return (
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        />
              
    )
}

export default SingleRepository