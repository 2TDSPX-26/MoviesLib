import { View, Text, StyleSheet, TextInput, Switch } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { s, vs } from 'react-native-size-matters'
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
    const [theme, setTheme] = useState<number | null>(0)
    const [autoPlay, setAutoPlay] = useState<boolean | null>(false)
    const [category, setCategory] = useState<string | null>("")

    const loadData = async () => {
        try {
            const storedTheme = await AsyncStorage.getItem("theme")
            const storedAutoPlay = await AsyncStorage.getItem("autoPlay")
            const storedCategory = await AsyncStorage.getItem("category")

            if (storedTheme) {
                setTheme(Number(storedTheme))
            }
            if (storedAutoPlay) {
                setAutoPlay(storedAutoPlay === "true")
            }
            if (storedCategory) {
                setCategory(storedCategory)
            }
        } catch (error) {
            console.log("Erro ao carregar os ajustes:", error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if (theme) {
            AsyncStorage.setItem("theme", String(theme))
        }
    }, [theme])

    useEffect(() => {
        if (autoPlay) {
            AsyncStorage.setItem("autoPlay", String(autoPlay))
        }
    }, [autoPlay])

    useEffect(() => {
        if (category) {
            AsyncStorage.setItem("category", category)
        }
    }, [category])

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Ajustes</Text>

                {/* Tema de cores */}
                <Text style={styles.sectionTitle}>TEMA</Text>
                <SegmentedControl
                    style={{marginBottom: 32}}
                    values={["Vermelho", "Azul", "Laranja"]}
                    selectedIndex={theme}
                    onChange={(event) => {
                        setTheme(event.nativeEvent.selectedSegmentIndex)
                    }}
                />

                {/* Auto Play */}
                <View style={styles.autoPlaySection}>
                    <Text style={[styles.sectionTitle, {marginBottom: 0}]}>AUTOPLAY</Text>
                    <Switch
                        value={autoPlay}
                        onValueChange={setAutoPlay}
                        trackColor={{false: "#bbb", true: "#EB4435"}}
                        thumbColor={'white'}
                        ios_backgroundColor="#bbb"
                    />
                </View>

                {/* Categoria */}
                <Text style={ styles.sectionTitle }>CATEGORIA FAVORITA</Text>
                <TextInput
                    style={styles.input}
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Digite sua categoria favorita"
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 24
    },
    sectionTitle: {
        fontSize: s(12),
        color: '#8d8d8d',
        marginBottom: 14,
    },
    autoPlaySection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    input: {
        height: 42,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    }
})