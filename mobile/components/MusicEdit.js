import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import MusicForm from './MusicForm';

const MusicEdit = ({ route, navigation }) => {
    const { id } = route.params;
    const [musica, setMusica] = useState(null);

    useEffect(() => {
        axios.get(`http://192.168.18.183:3001/musicas/${id}`)
            .then(response => setMusica(response.data))
            .catch(error => console.error(error));
    }, []);

    if (!musica) return null;

    const handleEditMusic = async (updatedMusic) => {
        await axios.put(`http://localhost:3001/musicas/${id}`, updatedMusic);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <MusicForm initialValues={musica} onSubmit={handleEditMusic} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
});

export default MusicEdit;
