import express from "express"
import { uploadImageContoller } from "../Controller/Controller.js"

const uploadImage = express.Router()


uploadImage.post("/upload-image", uploadImageContoller)

export default uploadImage
