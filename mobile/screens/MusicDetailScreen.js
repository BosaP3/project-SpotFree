import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const MusicDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, onDelete } = route.params;
    const [musica, setMusica] = useState(null);

    useEffect(() => {
        const fetchMusica = async () => {
            try {
                const response = await axios.get(`http://192.168.18.183:3001/musicas/${id}`);
                setMusica(response.data);
            } catch (error) {
                console.error('Erro ao buscar música:', error);
            }
        };

        fetchMusica();
    }, [id]);

    const handleDelete = () => {
        Alert.alert(
            "Confirmação",
            "Você tem certeza que deseja excluir esta música?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.18.183:3001/musicas/${id}`);
                            if (onDelete) onDelete(id);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Erro ao excluir música:', error);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    if (!musica) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{musica.titulo}</Text>
            <Text>Duração: {musica.duracao}</Text>
            <Text>ID do Álbum: {musica.id_album}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Editar"
                    onPress={() => navigation.navigate('EditMusic', { id })}
                />
                <Button
                    title="Excluir"
                    onPress={handleDelete}
                    color="red"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});

export default MusicDetailScreen;
