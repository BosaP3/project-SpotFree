import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id_album: number

    @Column()
    titulo: string

    @Column()
    ano_lancamento: number

    @Column()
    id_artista: number
}