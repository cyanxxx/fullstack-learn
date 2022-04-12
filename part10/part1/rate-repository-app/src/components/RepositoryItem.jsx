import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useHistory } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});
const cardFooterTextStyles = StyleSheet.create({
    value: {
        fontWeight: 'bold',
        color: theme.colors.textPrimary
    },
    label: {
        color: theme.colors.textSecondary
    }
});
const cardHeaderStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 10,
    },
    avatarContainer: {
      flexGrow: 0,
    },
    infoContainer: {
      flexGrow: 1,
      paddingLeft: 10
    },
    languageContainer: {
        flexDirection: 'row'
    },
    language: {
        flexGrow: 0,
        color: '#fff',
        backgroundColor: theme.colors.primary,
        padding: 3,
        borderRadius: 3
    },
    description: {
        ...cardFooterTextStyles.label,
        display: 'flex',
        flexWrap: 'wrap'
    }
  });

const cardFooterStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-around',
    },
});  
  

const CardHeader = ({item}) => {
    return (
      <View style={cardHeaderStyles.container}>
        <View style={cardHeaderStyles.avatarContainer}>
          <Image style={cardHeaderStyles.avatar} source={{uri: item.ownerAvatarUrl}} />
        </View>
        <View style={cardHeaderStyles.infoContainer}>
          <Text style={cardFooterTextStyles.value} testID="fullName">{item.fullName}</Text>
          <Text style={cardHeaderStyles.description}>{item.description}</Text>
          <View style={cardHeaderStyles.languageContainer}>
            <Text style={cardHeaderStyles.language}>{item.language}</Text>
          </View>
        </View>
      </View>
    );
};

const CardFooter = ({item}) => {
    return (
      <View style={cardFooterStyles.container}>
            <View>
                <CardFooterText label="Stars" value={item.stargazersCount}></CardFooterText>
            </View>
            <View>
                <CardFooterText label="Forks" value={item.forksCount}></CardFooterText>
            </View>
            <View>
                <CardFooterText label="Reviews" value={item.reviewCount}></CardFooterText>
            </View>
            <CardFooterText label="Rating" value={item.ratingAverage}></CardFooterText>
      </View>
    );
};

const CardFooterText = ({label, value}) => {
    return (
        <View>
            <Text style={cardFooterTextStyles.value}>{formatNum(value)}</Text>
            <Text style={cardFooterTextStyles.label}>{label}</Text>
        </View>
    )
}

const formatNum = (num) => num > 1000? (num / 1000).toFixed(1) + 'k' : num

export default function RepositoryItem({item, children}) {
  const history = useHistory()
  const handleNav = () => {
    history.push(`/repository/${item.id}`)
  }
  if(children) {
    return (
         <View testID="repositoryItem" style={styles.container}>
            <CardHeader item={item}></CardHeader>
            <CardFooter item={item}></CardFooter>
            {children}
        </View>    
    )
  }else{
    return (
      <Pressable onPress={handleNav}>
        <View testID="repositoryItem" style={styles.container}>
          <CardHeader item={item}></CardHeader>
          <CardFooter item={item}></CardFooter>
        </View>    
      </Pressable>
    )
  }
}


