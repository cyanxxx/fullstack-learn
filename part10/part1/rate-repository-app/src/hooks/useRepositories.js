import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({searchKeyword, order}) => {
  const orderObj = JSON.parse(order)
  const { data, ...result }  = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: orderObj.orderBy,
      orderDirection : orderObj.orderDirection,
      searchKeyword 
    }
  });
  return { repositories: data ? data.repositories : undefined, ...result };
};

export default useRepositories;