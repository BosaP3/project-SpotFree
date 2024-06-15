import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [musicas, setMusicas] = useState([]);
    const isFocused = useIsFocused();

    const fetchMusicas = async () => {
        try {
            const response = await axios.get('http://192.168.18.183:3001/musicas');
            const orderedMusicas = response.data.sort((a, b) => a.id_musica - b.id_musica);
            setMusicas(orderedMusicas);
        } catch (error) {
            console.error('Erro ao buscar músicas:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchMusicas();
        }
    }, [isFocused]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchMusicas();
        });

        return unsubscribe;
    }, [navigation]);

    const handleDelete = (id) => {
        setMusicas((prevMusicas) => prevMusicas.filter(musica => musica.id_musica !== id));
    };

    useEffect(() => {
        navigation.setOptions({
            onDelete: handleDelete
        });
    }, [navigation, handleDelete]);

    return (
        <View style={styles.container}>
            <FlatList
                data={musicas}
                keyExtractor={(item) => item.id_musica.toString()}
                ListHeaderComponent={
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Adicionar Música"
                            onPress={() => navigation.navigate('AddMusic')}
                        />
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MusicDetail', { id: item.id_musica })}
                    >
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.titulo}</Text>
                            <Text>Duração: {item.duracao}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={styles.noDataText}>Nenhuma música encontrada.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noDataText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#888',
    },
});

export default HomeScreen;
