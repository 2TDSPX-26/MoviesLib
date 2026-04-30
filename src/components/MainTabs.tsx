import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MovieListScreen from "../screens/MovieListScreen"
import SettingsScreen from "../screens/SettingsScreen"
import MapScreen from "../screens/MapScreen"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const Tab = createBottomTabNavigator()

export default function MainTabs() {
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: "#EB4435",
                tabBarInactiveTintColor: "#999",
                tabBarLabelStyle: {fontSize: 12},
                tabBarIcon: ({color, size}) => {
                    let iconName: string;
                    switch (route.name) {
                        case "MovieListScreen":
                            iconName = "movie"
                            break
                        case "MapScreen":
                            iconName = "map"
                            break
                        case "SettingsScreen":
                            iconName = "settings"
                            break
                        default:
                            iconName = "fruit-watermelon"
                            break
                    }
                    return <MaterialIcons name={iconName} size={24} color={color} />
                }
            })}
        >
            <Tab.Screen
               name="MovieListScreen"
               component={MovieListScreen}
               options={{
                title: "Filmes",
                headerShown: false,
            }} 
            />
            <Tab.Screen
               name="MapScreen"
               component={MapScreen}
               options={{title: "Mapa"}} 
            />
            <Tab.Screen
               name="SettingsScreen"
               component={SettingsScreen}
               options={{title: "Ajustes"}} 
            />
        </Tab.Navigator>
    )
}