import { Stack } from 'expo-router';
import BottomBar from '../../components/BottomBar';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function DashboardLayout() {
  return (
    <>
    {/* <SafeAreaView> */}
      <Stack screenOptions={{ headerShown: false }} />
      <BottomBar />
    {/* </SafeAreaView> */}
    </>
  );
}