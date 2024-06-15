import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import MusicForm from '../components/MusicForm';

const AddMusicScreen = ({ navigation }) => {
    const [music, setMusic] = useState({
        titulo: '',
        duracao: '',
        id_album: ''
    });

    const handleSubmit = async () => {
        try {
            await axios.post('http://192.168.18.183:3001/musicas', {
                titulo: music.titulo,
                duracao: music.duracao,
                id_album: music.id_album,
            });
            navigation.navigate('Home');
        } catch (error) {
            console.error('Erro ao adicionar música:', error);
        }
    };

    return (
        <View style={styles.container}>
            <MusicForm
                title={music.titulo}
                duration={music.duracao}
                albumId={music.id_album}
                onChangeTitle={(text) => setMusic({ ...music, titulo: text })}
                onChangeDuration={(text) => setMusic({ ...music, duracao: text })}
                onChangeAlbumId={(text) => setMusic({ ...music, id_album: text })}
                onSubmit={handleSubmit}
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

export default AddMusicScreen;
