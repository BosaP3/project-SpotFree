import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Musica} from "../models/musica"
export const getMusicas = async (req: Request, res: Response) => {
    try {
        const musicas:Musica[] = await AppDataSource.getRepository(Musica).find()
        res.status(200).json(musicas)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar musicas' })
    }
}

export const getMusica = async (req: Request, res: Response) => {
    const id_musica: number = +req.params.id
    const results: Musica = await AppDataSource.getRepository(Musica).findOneBy({id_musica: id_musica})
    if(results == null)
        return res.status(500).json({ message: 'Musica não encontrada' });

    return res.status(200).send(results)
}

export const addMusica = async (req: Request, res: Response) => {
    const musica: Musica[] = await AppDataSource.getRepository(Musica).create(req.body)
    const results: Musica[] = await AppDataSource.getRepository(Musica).save(musica)
    return res.send(results)
}

export const updateMusica = async (req: Request, res: Response) => {
    const id_musica: number = +req.params.id
    const musica: Musica = await AppDataSource.
        getRepository(Musica).
        findOneBy({ id_musica: id_musica })

    AppDataSource.getRepository(Musica).merge(musica, req.body)
    const results: Musica = await AppDataSource.getRepository(Musica).save(musica)
    return res.send(results)
}

export const deleteMusica = async (req: Request, res: Response) => {
    const id_musica: number = +req.params.id
    const results = await AppDataSource.getRepository(Musica).delete(id_musica)
    return res.send(results)
}