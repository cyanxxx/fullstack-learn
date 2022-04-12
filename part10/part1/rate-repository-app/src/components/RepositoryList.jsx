import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import theme from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    backgroundColor: theme.colors.backgroundCard,
    padding: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const Order = ({selectedOrder, setSelectedOrder}) => {
  return (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedOrder(itemValue)
      }>
      <Picker.Item label="Latest repositories" value={JSON.stringify({orderBy: 'CREATED_AT', orderDirection: 'DESC'})} />
      <Picker.Item label="Highest rated repositories" value={JSON.stringify({orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'})} />
      <Picker.Item label="Lowest rated repositories" value={JSON.stringify({orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'})} />
    </Picker>
  )
}

const RepositoryListHeader = ({searchQuery, onChangeSearch, ...props}) => {
  return (
    <View style={styles.header}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Order {...props}></Order>
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, ...props }) => {
  const repositoryNodes = repositories
  ? repositories.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<RepositoryListHeader {...props} />}
      renderItem={({item}) => <RepositoryItem item={item}></RepositoryItem>}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(JSON.stringify({orderBy: 'CREATED_AT', orderDirection: 'DESC'}));
  const [searchQuery, setSearchQuery] = React.useState('');
  const [query] = useDebounce(searchQuery, 1000);
  const onChangeSearch = query => setSearchQuery(query);
  const searchParam = {
    searchKeyword: query,
    order: selectedOrder,
  }
  const { repositories } = useRepositories(searchParam);
  return <RepositoryListContainer 
      repositories={repositories} 
      setSelectedOrder={setSelectedOrder} 
      selectedOrder={selectedOrder}
      searchQuery={searchQuery}
      onChangeSearch={onChangeSearch}
    />;
};

export default RepositoryList;