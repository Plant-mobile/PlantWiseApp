import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedView = ({style = null, ...props}) => {
  const colorScheme =useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <View  
    style = {[{backgroundColor: theme.secondaryBackgroundColor}, style]}
    {...props}
    />

  )
}

export default ThemedView

