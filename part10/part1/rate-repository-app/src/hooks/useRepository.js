import { useQuery } from '@apollo/client';
import { REPOSITORY } from '../graphql/queries';

const useRepository = ({id, ...props}) => {
  const variables = {
    repositoryId: id,
    ...props
  }
  const { data, fetchMore, loading }  = useQuery(REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
   
    const canFetchMore = !loading && data.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  return { repository: data ? data.repository : undefined , fetchMore: handleFetchMore};
};

export default useRepository;