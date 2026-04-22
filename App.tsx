import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MovieListScreen from './src/screens/MovieListScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MainTabs from './src/components/MainTabs';

export default function App() {
  return (
    <View style={styles.container}>
      <MainTabs />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
