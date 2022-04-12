import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({searchKeyword, order, first}) => {
  const orderObj = JSON.parse(order)
  const variables = {
    orderBy: orderObj.orderBy,
    orderDirection : orderObj.orderDirection,
    searchKeyword, 
    first
  }
  const { data, fetchMore, loading, ...result }  = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  return { repositories: data ? data.repositories : undefined, fetchMore: handleFetchMore, ...result };
};

export default useRepositories;