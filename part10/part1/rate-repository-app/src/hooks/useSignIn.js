import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage';
import { apolloClient } from '../../App'

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(LOGIN);
  
    const signIn = async ({ username, password }) => {
        const { data } =  await mutate({ variables: {credentials: { username, password }}})
        console.log(data)
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
    };
  
    return [signIn, result];
};

export default useSignIn