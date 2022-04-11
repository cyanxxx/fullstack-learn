import React from 'react';
import { Text, View, Pressable, StyleSheet, useEffect } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik';
import theme from '../theme';
import { object, string, number, date, InferType }  from 'yup';
import useSignIn from '../hooks/useSignIn'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = object({
  username: string().required('username is required'),
  password: string().required('password is required'),
});

const style = StyleSheet.create({
  buttonText: {
    color: '#fff',
    padding: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    flexGrow: 1,
    marginTop: 5,
    ...theme.button
  },
  container: {
    margin: theme.margin.margin,
    display: 'flex'
  }
})

const SignIn = () => {
  const [signIn, result] = useSignIn()
  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password )
    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <View style={style.container}>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
        {({ handleSubmit }) => (
          <View>
             <FormikTextInput name="username" placeholder="Username" />
             <FormikTextInput name="password" placeholder="Password" secureTextEntry />
             <Pressable onPress={handleSubmit} style={style.button}>
                <Text style={style.buttonText}>Sign in</Text>
              </Pressable>
          </View>
        )}
      </Formik>
    </View>  
  ) 
};

export default SignIn;