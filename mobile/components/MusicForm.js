import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MusicForm = ({
    title,
    duration,
    albumId,
    onChangeTitle,
    onChangeDuration,
    onChangeAlbumId,
    onSubmit,
}) => {
    return (
        <View style={styles.container}>
            <Text>Título</Text>
            <TextInput
                value={title}
                onChangeText={onChangeTitle}
                style={styles.input}
            />
            <Text>Duração</Text>
            <TextInput
                value={duration}
                onChangeText={onChangeDuration}
                style={styles.input}
                keyboardType="numeric"
            />
            <Text>ID do Álbum</Text>
            <TextInput
                value={albumId}
                onChangeText={onChangeAlbumId}
                style={styles.input}
                keyboardType="numeric"
            />
            <Button title="Salvar" onPress={onSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 8,
    },
});

export default MusicForm;
