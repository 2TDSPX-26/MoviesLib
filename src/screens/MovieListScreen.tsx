import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
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
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import MovieRow, { Movie } from "../components/MovieRow";
// import movies from "../data/movies.json"
import { deleteMovie, getMovies } from "../services/movieService";

export default function MovieListScreen() {
    const navigation = useNavigation()
    const queryClient = useQueryClient()

    const { data: movies, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["movies"],
        queryFn: getMovies,
        select: (data) => data.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title)),
    })

    const deleteRow = async (movieId: string) => {
        try {
            await deleteMovie(movieId)
            queryClient.invalidateQueries({ queryKey: ["movies"] })
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir o filme")
        }
    }

    const renderHiddenItem = (data: any) => (
        <View style={{flexDirection: 'row', height:'100%', justifyContent: 'space-between'}}>
            <TouchableOpacity
                style={[styles.hiddenButton, {backgroundColor: '#35abeb'}]}
                onPress={() => navigation.navigate('MovieFormScreen', {movie: data.item})}
            >
                <MaterialCommunityIcons name="movie-open-edit" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.hiddenButton, {backgroundColor: '#EB4435'}]}
                onPress={() => {
                    Alert.alert(
                        "Confirmar Exclusão",
                        "Tem certeza que deseja excluir esse filme?",
                        [
                            {text: "Cancelar", style: "cancel"},
                            {text: "Excluir", style: "destructive", onPress: () => deleteRow(data.item.id)},
                        ],
                        { cancelable: true }
                    )
                }}
            >
                {/* <Text style={styles.deleteButtonText}>Excluir</Text> */}
                <Entypo name="trash" size={24} color="white" />
            </TouchableOpacity>
        </View>
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
                <SwipeListView
                    style={styles.list}
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Pressable
                            onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })}
                        >
                            <MovieRow movie={item}/>
                        </Pressable>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false} // Mostra o loading apenas no pull
                            onRefresh={refetch} // Chama refetch quando faz o pull
                            colors={['#EB4435']} //Cor do loading no Android
                            tintColor='#EB4435' //Cor do loading no iOS
                        />
                    }
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75} //Largura do botão de exclusão
                    leftOpenValue={75}
                    // disableRightSwipe={true}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    hiddenButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        alignSelf: 'flex-end',
        height: '100%'
    },
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