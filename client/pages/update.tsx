import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/styles.module.css';

interface MusicUpdate {
    titulo: string;
    duracao: string;
    id_album: string;
}

const Update = () => {
    const [musicId, setMusicId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [duracao, setDuracao] = useState('');
    const [idAlbum, setIdAlbum] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const atualizaMusica = async () => {
        try {
            const data: MusicUpdate = {
                titulo,
                duracao,
                id_album: idAlbum,
            };

            await axios.put(`http://localhost:3001/musicas/${musicId}`, data);
            setSuccessMessage('Música atualizada com sucesso!');
            setError('');
        } catch (error) {
            setError('Erro ao atualizar a música. Verifique os campos e tente novamente.');
            setSuccessMessage('');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Atualizar Música</h1>
            <input
                className={styles.input}
                type="text"
                value={musicId}
                onChange={(e) => setMusicId(e.target.value)}
                placeholder="ID da Música"
                required
            />
            <input
                className={styles.input}
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título"
                required
            />
            <input
                className={styles.input}
                type="text"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                placeholder="Duração"
                required
            />
            <input
                className={styles.input}
                type="text"
                value={idAlbum}
                onChange={(e) => setIdAlbum(e.target.value)}
                placeholder="ID do Álbum"
            />
            <button onClick={atualizaMusica} className={styles.button}>Atualizar</button>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
            <Link href="/">
                <button className={styles.button}>Voltar</button>
            </Link>
        </div>
    );
};

export default Update;
