import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const MusicList = ({ navigation }) => {
    const [musicas, setMusicas] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.18.183:3001/musicas')
            .then(response => setMusicas(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View>
            <FlatList
                data={musicas}
                keyExtractor={(musica) => musica.id_musica.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('MusicDetail', { id: item.id_musica })}>
                        <View style={styles.item}>
                            <Text style={styles.title}>{item.titulo}</Text>
                            <Text>{item.duracao}</Text>
                            <Text>{item.id_album}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MusicList;
