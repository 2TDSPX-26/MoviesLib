import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MovieRow from "../components/MovieRow";

import movies from "../data/movies.json"

export default function MovieListScreen() {
    const navigation = useNavigation()

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Filmes</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MovieFormScreen')}
                    >
                        <Text style={styles.formButton}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.list}
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })}
                        >
                            <MovieRow movie={item}/>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    formButton: {
        color: '#eb4435',
        fontSize: 32,
        fontWeight: 'black'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    list: {
        marginVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee'
    },
})