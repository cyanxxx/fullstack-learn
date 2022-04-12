import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries'

const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
  
    const createReview = async (values) => {
        const { data } =  await mutate({ variables: {review: values}})
        return data
    };
  
    return [createReview, result];
};

export default useReview