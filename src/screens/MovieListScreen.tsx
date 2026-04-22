import { View, Text, StyleSheet } from "react-native";

export default function MovieListScreen() {
    return(
        <View style={styles.container}>
            <Text>MovieListScreen</Text>
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