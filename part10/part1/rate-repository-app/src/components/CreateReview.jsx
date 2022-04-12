import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik';
import theme from '../theme';
import { object, string, number }  from 'yup';
import useReview from '../hooks/useReview'
import { useHistory } from 'react-router-native';
import FormikTextInput from './FormikTextInput'

const initialValues = {
    "ownerName": '',
    "repositoryName": '',
    "rating": '',
    "text": ''
}

const validationSchema = object({
    ownerName: string().required('Repository owner name is required'),
    repositoryName: string().required('Repository name is required'),
    rating: number().required('Rating is required').min(0).max(100),
});

const style = StyleSheet.create({
    ...theme.form
})

const CreateReview = () => {
    const [ createReview ] = useReview()
    const history = useHistory()
    const onSubmit = async ({ownerName, repositoryName, rating, text}) => {
        const data = await createReview({
            ownerName,
            repositoryName,
            rating: parseInt(rating),
            text,
        })
        history.push(`/repository/${data.createReview.repositoryId}`)
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
                <FormikTextInput name="ownerName" placeholder="Repository owner name" />
                <FormikTextInput name="repositoryName" placeholder="Repository name" />
                <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
                <FormikTextInput name="text" placeholder="Review" multiline numberOfLines={4} />
                <Pressable onPress={handleSubmit} style={style.button}> 
                    <Text style={style.buttonText}>Create a review</Text>
                </Pressable>
            </View>
            )}        
            </Formik>    
        </View>    
       
    )
}

export default CreateReview