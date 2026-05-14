import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { s, vs } from 'react-native-size-matters'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useLayoutEffect } from "react";
import { addMovie, updateMovie } from "../services/movieService";

export default function MovieFormScreen() {
    //Definindo os states para os campos
    const [title, setTitle] = useState("")
    const [rating, setRating] =  useState("")
    const [duration, setDuration] =  useState("")
    const [categories, setCategories] =  useState("")
    const [poster, setPoster] =  useState("")
    const [synopsis, setSynopsis] =  useState("")

    const route = useRoute();
    const navigation = useNavigation();

    //Recuperando o movie dos params
    const movie = route.params?.movie ?? null;
    const onSave = route.params?.onSave ?? null;

    function isValidUrl(text: string): boolean {
        try {
            const url = new URL(text)
            return url.protocol === "http:" || url.protocol === "https:"
        } catch {
            return false
        }
    }

    const handleSave = async () => {
        const parsedRating = parseFloat(rating.replace(",", "."))
        if (title.length == 0) {
            Alert.alert('Campo inválido', 'Digite o título do filme')
            return
        }
        if (Number.isNaN(parsedRating)) {
            Alert.alert('Campo inválido', 'Informe um valor numérico para a nota (ex.: 8.5).')
            return
        }
        if (duration.length == 0) {
            Alert.alert('Campo inválido', 'Digite a duração do filme')
            return
        }
        if (categories.length < 4) {
            Alert.alert('Campo inválido', 'Digite as categorias do filme.')
            return
        }
        if (!isValidUrl(poster)) {
            Alert.alert('Campo inválido', 'URL do pôster do filme inválida.')
            return
        }
        if (synopsis.length < 5) {
            Alert.alert('Campo inválido', 'Digite a sinopse do filme com pelo menos 5 caracteres.')
            return
        }

        const movieData = {
            title,
            rating: parsedRating,
            duration,
            categories,
            poster,
            synopsis
        }
        try {
            let savedMovie
            if (movie) {
                savedMovie = await updateMovie(movie.id, movieData)
            } else {
                savedMovie = await addMovie(movieData)
            }
            if (onSave) {
                onSave(savedMovie)
            }
            Alert.alert(
                "Parabéns!",
                "Suas alterações foram salvas com sucesso.",
                [
                    {text: "OK", style: 'default', onPress: () => navigation.goBack()},
                ],
                { cancelable: true }
            )
        } catch (error) {
            console.log(error)
            Alert.alert("Ops!", "Não foi possível salvar o filme.")
        }
    }

    //Usando useLayoutEffect para atualizar a tela após o render e antes dela ser exibida
    useLayoutEffect(() => {
        navigation.setOptions({title: movie == null ? "Cadastro" : "Edição"})
        if (movie) {
            setTitle(movie.title);
            setRating(movie.rating.toString());
            setDuration(movie.duration);
            setCategories(movie.categories);
            setPoster(movie.poster);
            setSynopsis(movie.synopsis);
        }
    }, [])

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ padding: 20, backgroundColor: "#f2f2f2" }}>
                {/* Título */}
                <Text style={ styles.sectionTitle }>TÍTULO</Text>
                <TextInput
                    style={ styles.input }
                    value={ title }
                    onChangeText={ setTitle } //Atualizar o state (title)
                    placeholder="Escreva o nome do filme"
                />
                
                {/* Nota e Duração */}
                <Text style={ styles.sectionTitle }>NOTA E DURAÇÃO</Text>
                <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                    <TextInput
                        style={ styles.input }
                        value={ rating }
                        onChangeText={ setRating }
                        placeholder="Nota"
                    />
                    <TextInput
                        style={ styles.input }
                        value={ duration }
                        onChangeText={ setDuration }
                        placeholder="Duração"
                    />
                </View>

                {/* Categorias */}
                <Text style={ styles.sectionTitle }>CATEGORIAS</Text>
                <TextInput
                    style={ styles.input }
                    value={ categories }
                    onChangeText={ setCategories }
                    placeholder="Insira as principais categorias"
                />
                
                {/* Pôster */}
                <Text style={ styles.sectionTitle }>PÔSTER</Text>
                <TextInput
                    style={ styles.input }
                    value={ poster }
                    onChangeText={ setPoster }
                    placeholder="Insira a URL do pôster"
                />

                {/* Sinopse */}
                <Text style={ styles.sectionTitle }>SINOPSE</Text>
                <TextInput
                    style={ [styles.input, {height: vs(120)}] }
                    value={ synopsis }
                    multiline
                    textAlignVertical="top"
                    onChangeText={ setSynopsis }
                />
                </ScrollView>

                {/* Botão de Salvar */}
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        onPress={handleSave}
                        style={styles.button}
                    >
                        <Text style={{color: 'white', fontSize: 18}}>
                            {movie == null ? "Cadastrar filme" : "Salvar alterações"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: '#eb4435',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonArea: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        height: 86,
    },
    input: {
        flex: 1,
        height: 42,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: s(12),
        color: '#3d3d3d'
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})