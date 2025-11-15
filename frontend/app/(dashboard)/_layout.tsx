import { Stack } from 'expo-router';
import BottomBar from '../../components/BottomBar';


export default function DashboardLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomBar />
    </>
  );
}