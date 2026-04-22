import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native"

export default function MovieListScreen() {

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <Text>MovieListScreen</Text>
            <Button
                title="Ir para tela de detalhes"
                onPress={() => navigation.navigate("MovieDetailsScreen")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})