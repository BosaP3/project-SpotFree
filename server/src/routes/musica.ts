import * as express from "express"
import {addMusica, deleteMusica, getMusica, getMusicas, updateMusica} from "../controllers/musica"

const routerMusica = express.Router()

routerMusica.get("/", getMusicas)
routerMusica.get("/:id", getMusica)
routerMusica.put("/:id", updateMusica)
routerMusica.post("/", addMusica)
routerMusica.delete("/:id", deleteMusica)

export default routerMusica
