import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign'
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import PlayButton from "../components/PlayButton";
import { Movie } from "../components/MovieRow";

import { useRoute } from "@react-navigation/native";

export default function MovieDetailsScreen() {
    const route = useRoute()

    const { movie } = route.params as { movie: Movie }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            {/* Imagem */}
            <View>
                <Image 
                    style={styles.image}
                    source={{uri: movie.poster}}
                />
                <LinearGradient
                    style={styles.gradient}
                    colors={['transparent', 'white']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 0, y: 1}}
                />
            </View>

            <View style={ styles.content}>
            {/* Título */}
                <Text style={styles.title}>{movie.title}</Text>

                {/* Nota */}
                <View style={styles.rating}>
                    <AntDesign name="star" size={20} color="#f7cb46" />
                    <Text style={[styles.text, {marginLeft: 12,}]}>{movie.rating}/10</Text>
                </View>

                <Text style={[styles.text, {marginBottom: 12}]}>
                    {movie.categories}
                </Text>

                <PlayButton />

                <ScrollView
                    style={styles.synopsisContainer}
                    contentContainerStyle={styles.synopsisContent}
                >
                    <Text style={[styles.text, {fontSize: 18, fontWeight: '600'}]}>
                        Sinopse
                    </Text>
                    <Text style={[styles.text, {marginBottom: 24,}]}>
                        {movie.synopsis}
                    </Text>
                </ScrollView>
            </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    synopsisContainer: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        padding: 14,
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 12,
    },
    text: {
        fontSize: 17,
    },
    rating: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        paddingHorizontal: 20,
        flex: 1
    },
    image: {
        width: '100%',
        height: 320,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    synopsisContent: {
        flexGrow: 1,
        justifyContent: 'center'
    }
})