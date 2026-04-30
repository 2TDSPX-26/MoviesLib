import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import MainTabs from './src/components/MainTabs';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import MovieFormScreen from './src/screens/MovieFormScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MainTabs'
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetailsScreen"
          component={MovieDetailsScreen}
          options={({ navigation, route }) => ({
            headerBackButtonDisplayMode: "minimal",
            headerTitle: "",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("MovieFormScreen", { movie: route.params?.movie })}
              >
                <Text style={styles.navButton}>Editar</Text>
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="MovieFormScreen"
          component={MovieFormScreen}
          options={({ navigation }) => ({
            headerBackButtonDisplayMode: "minimal",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.popToTop()}
              >
                <Text style={styles.navButton}>Início</Text>
              </TouchableOpacity>
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navButton: {
    color: "#eb4435",
    fontSize: 18,
    paddingHorizontal: 6
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
