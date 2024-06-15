import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const MusicDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [musica, setMusica] = useState(null);

    useEffect(() => {
        axios.get(`http://192.168.18.183:3001/musicas/${id}`)
            .then(response => setMusica(response.data))
            .catch(error => console.error(error));
    }, []);

    if (!musica) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{musica.titulo}</Text>
            <Text>Duração: {musica.duracao}</Text>
            <Text>ID do Álbum: {musica.id_album}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('EditMusic', { id })} />
            <Button title="Excluir" onPress={async () => {
                await axios.delete(`http://192.168.18.183:3001/musicas/${id}`);
                navigation.navigate('Home');
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default MusicDetail;
