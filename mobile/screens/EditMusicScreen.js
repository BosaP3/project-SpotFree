import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MusicForm from '../components/MusicForm';

const EditMusicScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
    const [music, setMusic] = useState(null);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await axios.get(`http://192.168.18.183:3001/musicas/${id}`);
                setMusic(response.data);
            } catch (error) {
                console.error('Erro ao buscar música:', error);
            }
        };

        fetchMusic();
    }, [id]);

    const handleSubmit = async (updatedMusic) => {
        try {
            await axios.put(`http://192.168.18.183:3001/musicas/${id}`, updatedMusic);
            navigation.navigate('Home', { refresh: true });
        } catch (error) {
            console.error('Erro ao atualizar música:', error);
        }
    };

    if (!music) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MusicForm
                title={music.titulo}
                duration={music.duracao.toString()}
                albumId={music.id_album.toString()}
                onChangeTitle={(text) => setMusic({ ...music, titulo: text })}
                onChangeDuration={(text) => setMusic({ ...music, duracao: text })}
                onChangeAlbumId={(text) => setMusic({ ...music, id_album: text })}
                onSubmit={() => handleSubmit(music)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default EditMusicScreen;
