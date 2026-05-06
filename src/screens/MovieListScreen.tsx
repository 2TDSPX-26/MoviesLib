import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Pressable
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useCallback } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MovieRow, { Movie } from "../components/MovieRow";
// import movies from "../data/movies.json"
import { getMovies } from "../services/movieService";

export default function MovieListScreen() {
    const navigation = useNavigation()
    const queryClient = useQueryClient()

    const { data: movies, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["movies"],
        queryFn: getMovies,
        select: (data) => data.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title)),
    })

    const renderHiddenItem = (data) => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
                Alert.alert(
                    "Confirmar Exclusão",
                    "Tem certeza que deseja excluir esse filme?",
                    [
                        {text: "Cancelar", style: "cancel"},
                        {text: "Excluir", style: "destructive", onPress: () => {}},
                    ],
                    { cancelable: true }
                )
            }}
        >
            <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
    )

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({queryKey: ["movies"]})
        }, [queryClient])
    )

    if (isLoading) {
        return(
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#EB4435" />
            </View>
        )
    }

    if (isError) {
        return(
            <View style={styles.center}>
                <Text>Erro ao carregar os filmes!!</Text>
            </View>
        )
    }
    
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
    center: {},
    deleteButtonText: {},
    deleteButton: {},
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