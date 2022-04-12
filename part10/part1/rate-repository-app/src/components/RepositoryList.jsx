import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
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

export const RepositoryListContainer = ({ repositories, ...props }) => {
  const repositoryNodes = repositories
  ? repositories.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Order {...props} ></Order>}
      renderItem={({item}) => <RepositoryItem item={item}></RepositoryItem>}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(JSON.stringify({orderBy: 'CREATED_AT', orderDirection: 'DESC'}));
  const { repositories } = useRepositories(selectedOrder);
  return <RepositoryListContainer repositories={repositories} setSelectedOrder={setSelectedOrder} selectedOrder={selectedOrder} />;
};

export default RepositoryList;