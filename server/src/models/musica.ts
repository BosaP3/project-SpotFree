import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Musica {
    @PrimaryGeneratedColumn()
    id_musica: number

    @Column()
    titulo: string

    @Column()
    duracao: number

    @Column()
    id_album: number
}