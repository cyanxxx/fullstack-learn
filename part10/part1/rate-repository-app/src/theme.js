import { Platform } from 'react-native';
const colors = {
  textPrimary: '#24292e',
  textSecondary: '#586069',
  primary: '#0366d6',
  background: '#24292e',
  error: '#d73a4a',
  backgroundCard: '#eee'
}
const button = {
  borderRadius: 5,
}
const margin = {
  margin: 12
}
const theme = {
    colors,
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    button,
    margin,
    form: {
      buttonText: {
        color: '#fff',
        padding: 10,
      },
      button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        flexGrow: 1,
        marginTop: 5,
        ...button
      },
      container: {
        ...margin,
        display: 'flex'
      }
    }
  };
  
  export default theme;