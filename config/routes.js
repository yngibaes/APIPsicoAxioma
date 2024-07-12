import { Router } from "express";
import infoController from "./infoController.js";

const router = new Router()

//Get all the info
router.get('/info', infoController.index)

//Create a new info
router.post('/signup', infoController.signup)

/* //specific info for id
router.get('/info/:id', infoController.details)  */

export default router