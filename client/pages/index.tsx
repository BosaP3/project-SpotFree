import { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/styles.module.css';

interface Music {
    id_musica: number;
    titulo: string;
    duracao: number;
    id_album: number;
}

const Home: NextPage = () => {
    const [musicId, setMusicId] = useState('');
    const [musicas, setMusicas] = useState<Music[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMusicas = async () => {
            try {
                const response = await axios.get<Music[]>('http://localhost:3001/musicas');
                setMusicas(response.data);
            } catch (error) {
                console.error('Erro ao buscar músicas:', error);
            }
        };

        fetchMusicas();
    }, []);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/read?id=${musicId}`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.logo}>Mega SpotFree 2</div>
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Pesquisar ID..."
                        value={musicId}
                        onChange={(e) => setMusicId(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.menuVertical}>
                    <Link href="/create">
                        <button className={styles.button}>Adicionar</button>
                    </Link>
                    <Link href="/update">
                        <button className={styles.button}>Atualizar</button>
                    </Link>
                    <Link href="/delete">
                        <button className={styles.button}>Deletar</button>
                    </Link>
                </div>
                <div className={styles.listaMusicas}>
                    <h2 className={styles.title}>Lista de Músicas</h2>
                    {musicas.length > 0 ? (
                        musicas.map((musica) => (
                            <div key={musica.id_musica} className={styles.song_item}>
                                <p className={styles.song_title}>Título: {musica.titulo}</p>
                                <p className={styles.song_title}>Duração: {(musica.duracao / 60).toFixed(2)} minutos</p>
                                <p className={styles.song_title}>ID do Álbum: {musica.id_album}</p>
                                <p className={styles.song_title}>ID da Música: {musica.id_musica}</p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.error}>Nenhuma música encontrada.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
