import React from 'react'
import { ReviewItem } from './SingleRepository'
import useMe from '../hooks/useMe'
import { FlatList, View, Pressable, Text, StyleSheet, Alert } from 'react-native'
import theme from '../theme'
import * as Linking from 'expo-linking';
import { DELETE_REVIEW } from '../graphql/queries'
import { useMutation } from '@apollo/client';

const styles = StyleSheet.create({
    container: {
        ...theme.form.container, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    viewButton: {
        ...theme.form.button,
        marginRight: 10
    },
    deleteButton: {
        ...theme.form.button,
        backgroundColor: '#f00'
    }
})

const MyReviewItem = ({item, refetch}) => {
    const [deleteReview] = useMutation(DELETE_REVIEW)
    const view = () => {
        Linking.openURL(item.repository.url);
    }
    const deleteReviewHandler = () => {
        Alert.alert(
          "Delete review",
          "Are you sure to delete this review?",
          [
            {
                text: "CANCEL",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { 
              text: "DELETE", 
              onPress: async() => {
                await deleteReview({variables: {deleteReviewId: item.id}})
                refetch()
              } 
            }
          ]
        )
    }
    return (
        <View>
            <ReviewItem review={item} />
             <View style={styles.container}>
                 <Pressable onPress={view} style={styles.viewButton}>
                     <Text style={theme.form.buttonText}>View Repository</Text>
                 </Pressable>
                 <Pressable onPress={deleteReviewHandler} style={styles.deleteButton}>
                     <Text style={theme.form.buttonText}>Delete View</Text>
                 </Pressable>
             </View>
        </View>        
    )
}

function MyReview() {
    const { data, fetchMore, refetch } = useMe(true)
    const reviews = data? data.me.reviews.edges.map(review => review.node) : []
    return (
        <FlatList
          data={reviews}
          renderItem={({ item }) => <MyReviewItem item={item} refetch={refetch} />}
          keyExtractor={({ id }) => id}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
        />
    )
}

export default MyReview