import { Router } from "express";
import infoController from "./infoController.js";

const router = new Router()

//Get all the info
router.get('/info', infoController.index)

//Create a new info
router.post('/info', infoController.store)

//specific info for id
router.get('/info/:id', infoController.details) 

export default router