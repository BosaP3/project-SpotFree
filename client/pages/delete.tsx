import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/styles.module.css';

interface MusicDetails {
    id: number;
    titulo: string;
    duracao: number;
    id_album: number;
}

const Delete = () => {
    const [musicId, setMusicId] = useState('');
    const [musicDetails, setMusicDetails] = useState<MusicDetails | null>(null);
    const [exclusao, setExclusao] = useState(false);
    const [textprint, setTextPrint] = useState('');
    const [error, setError] = useState('');

    const deletaMusicaId = async () => {
        try {
            await axios.delete(`http://localhost:3001/musicas/${musicId}`);
            setExclusao(true);
            setTextPrint('Excluída com sucesso');
            setError('');
        } catch (error) {
            setError('Erro ao excluir a música. Verifique o ID e tente novamente.');
            setExclusao(false);
            setTextPrint('Não foi excluída');
        }
    };

    const pesquisaMusicaID = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/musicas/${musicId}`);
            setMusicDetails(response.data);
            setError('');
            return response.data.titulo;
        } catch (error) {
            setError('Erro ao buscar a música. Verifique o ID e tente novamente.');
            setMusicDetails(null);
            return null;
        }
    };

    const executa = async () => {
        try {
            const musicName = await pesquisaMusicaID();
            if (musicName) {
                const resultado = confirm(`Deseja excluir a música '${musicName}'?`);
                if (resultado) {
                    await deletaMusicaId();
                } else {
                    setTextPrint('Cancelada a exclusão');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Deletar Música</h1>
            <input
                className={styles.input}
                type="text"
                value={musicId}
                onChange={(e) => setMusicId(e.target.value)}
                placeholder="Digite o ID da música"
                required
            />
            <button onClick={executa} className={styles.button}>Deletar</button>
            {error && <p className={styles.error}>{error}</p>}
            {exclusao && (
                <div>
                    <h2>Música {musicDetails?.titulo} {textprint}</h2>
                </div>
            )}
            <Link href="/">
                <button className={styles.button}>Voltar</button>
            </Link>
        </div>
    );
};

export default Delete;
