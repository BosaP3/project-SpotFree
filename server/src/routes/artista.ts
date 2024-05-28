import * as express from "express"
import {addArtista, deleteArtista, getArtista, getArtistas, updateArtista} from "../controllers/artista"

const routerArtista = express.Router()

routerArtista.get("/", getArtistas)
routerArtista.get("/:id", getArtista)
routerArtista.put("/:id", updateArtista)
routerArtista.post("/", addArtista)
routerArtista.delete("/:id", deleteArtista)

export default routerArtista