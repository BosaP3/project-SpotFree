import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Album} from "../models/album"
export const getAlbuns = async (req: Request, res: Response) => {
    try {
        const albuns:Album[] = await AppDataSource.getRepository(Album).find()
        res.status(200).json(albuns)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar albuns' })
    }
}

export const getAlbum = async (req: Request, res: Response) => {
    const id_album: number = +req.params.id
    const results: Album = await AppDataSource.getRepository(Album).findOneBy({id_album: id_album})
    if(results == null)
        return res.status(500).json({ message: 'Album não encontrado' });

    return res.status(200).send(results)
}

export const addAlbum = async (req: Request, res: Response) => {
    const album: Album[] = await AppDataSource.getRepository(Album).create(req.body)
    const results: Album[] = await AppDataSource.getRepository(Album).save(album)
    return res.send(results)
}

export const updateAlbum = async (req: Request, res: Response) => {
    const id_album: number = +req.params.id
    const album: Album = await AppDataSource.
        getRepository(Album).
        findOneBy({ id_album: id_album })

    AppDataSource.getRepository(Album).merge(album, req.body)
    const results: Album = await AppDataSource.getRepository(Album).save(album)
    return res.send(results)
}

export const deleteAlbum = async (req: Request, res: Response) => {
    const id_album: number = +req.params.id
    const results = await AppDataSource.getRepository(Album).delete(id_album)
    return res.send(results)
}