import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Artista {
    @PrimaryGeneratedColumn()
    id_artista: number

    @Column()
    nome: string

    @Column()
    genero: string
}