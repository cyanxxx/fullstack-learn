import { useQuery } from '@apollo/client';
import { REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data }  = useQuery(REPOSITORY, {
    variables: {
      repositoryId: id
    }
  });
  return { repository: data ? data.repository : undefined };
};

export default useRepository;