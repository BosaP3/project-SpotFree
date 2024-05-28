import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/styles.module.css';

interface Music {
    id_musica: number;
    titulo: string;
    duracao: number;
    id_album: number;
}

const Read = () => {
    const [musicDetails, setMusicDetails] = useState<Music | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const pesquisaMusicaID = async (id: string) => {
            try {
                const response = await axios.get(`http://localhost:3001/musicas/${id}`);
                setMusicDetails(response.data);
                setError('');
            } catch (error) {
                setError('Erro ao buscar a música. Verifique o ID e tente novamente.');
                setMusicDetails(null);
            }
        };
        if (id) {
            pesquisaMusicaID(id as string);
        }
    }, [id]);

    return (
        <div className={styles.container}>
            
            {musicDetails ? (
                <div className={styles.wrapper_single_musica}>
                    <h2 className={styles.all_music_title}>Música selecionada</h2>
                    <div className={styles.song_item}>
                        <p className={styles.song_title}>Título: {musicDetails.titulo}</p>
                        <p className={styles.song_title}>Duração: {(musicDetails.duracao / 60).toFixed(2)} minutos</p>
                        <p className={styles.song_title}>ID da Música: {musicDetails.id_musica}</p>
                    </div>
                </div>
            ) : (
                error && <p className={styles.error}>{error}</p>
            )}
            <Link href="/">
                <button className={styles.button}>Voltar</button>
            </Link>
        </div>
    );
};

export default Read;
