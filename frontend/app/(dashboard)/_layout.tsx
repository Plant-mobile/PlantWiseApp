import { Tabs } from "expo-router"


const _layout = () => {
  return (
   <Tabs 
   screenOptions={{headerShown: false, tabBarStyle: {
    height:200
   }}} 
   >
    <Tabs.Screen name="test" options={{title:"Test"}} />
    <Tabs.Screen name="main" options={{title:"Main"}} />
  </Tabs>
  ) 
}

export default _layout
