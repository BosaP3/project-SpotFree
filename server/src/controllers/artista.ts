import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Artista} from "../models/artista"
export const getArtistas = async (req: Request, res: Response) => {
    try {
        const artistas:Artista[] = await AppDataSource.getRepository(Artista).find()
        res.status(200).json(artistas)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar artistas' })
    }
}

export const getArtista = async (req: Request, res: Response) => {
    const id_artista: number = +req.params.id
    const results: Artista = await AppDataSource.getRepository(Artista).findOneBy({id_artista: id_artista})
    if(results == null)
        return res.status(500).json({ message: 'Artista não encontrado' });

    return res.status(200).send(results)
}

export const addArtista = async (req: Request, res: Response) => {
    const artista: Artista[] = await AppDataSource.getRepository(Artista).create(req.body)
    const results: Artista[] = await AppDataSource.getRepository(Artista).save(artista)
    return res.send(results)
}

export const updateArtista = async (req: Request, res: Response) => {
    const id_artista: number = +req.params.id
    const artista: Artista = await AppDataSource.
        getRepository(Artista).
        findOneBy({ id_artista: id_artista })

    AppDataSource.getRepository(Artista).merge(artista, req.body)
    const results: Artista = await AppDataSource.getRepository(Artista).save(artista)
    return res.send(results)
}

export const deleteArtista = async (req: Request, res: Response) => {
    const id_artista: number = +req.params.id
    const results = await AppDataSource.getRepository(Artista).delete(id_artista)
    return res.send(results)
}