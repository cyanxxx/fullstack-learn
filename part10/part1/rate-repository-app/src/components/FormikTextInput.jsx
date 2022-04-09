import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={{borderColor: showError? theme.colors.error : theme.colors.textSecondary }}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;