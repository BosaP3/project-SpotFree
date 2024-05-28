import express from "express"
import cors from "cors"
import routerArtista from "./routes/artista"
import routerMusica from "./routes/musica"
import routerAlbum from "./routes/album"
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  console.log("Inicializado")
}).catch((err) => {
  console.error("Error", err)
})

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

app.use("/artistas", routerArtista)
app.use("/musicas", routerMusica)
app.use("/albuns", routerAlbum)

app.listen(port, () => {
  console.log(`[server]: Server up at http://localhost:${port}`)
})
