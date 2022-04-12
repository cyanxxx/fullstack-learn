import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (includeReviews = false, first = 3) => {
    const variables = {
        includeReviews,
        first
    }
    const { data, fetchMore, loading, refetch } = useQuery(ME, {
        variables,
    })
    const handleFetchMore = () => {
        const canFetchMore = !loading && data && data.me.reviews.pageInfo.hasNextPage;
        
        if (!canFetchMore) {
          return;
        }
        fetchMore({
          variables: {
            after: data.me.reviews.pageInfo.endCursor,
            ...variables,
          },
        });
      };
    return { data, fetchMore: handleFetchMore, refetch }
}

export default useMe