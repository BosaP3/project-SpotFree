import * as express from "express"
import {addAlbum, deleteAlbum, getAlbum, getAlbuns, updateAlbum} from "../controllers/album"

const routerAlbum = express.Router()

routerAlbum.get("/", getAlbuns)
routerAlbum.get("/:id", getAlbum)
routerAlbum.put("/:id", updateAlbum)
routerAlbum.post("/", addAlbum)
routerAlbum.delete("/:id", deleteAlbum)

export default routerAlbum