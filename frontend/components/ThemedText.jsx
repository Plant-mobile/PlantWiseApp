import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedText = ({style = null, title = false, ...props}) => {
  return (
    <Text 
    style = {[{color: Colors.primaryColor}, style]}
    {...props}
    />

  )
}

export default ThemedText
