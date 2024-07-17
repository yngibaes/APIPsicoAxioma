import { Router } from "express";
import diaryController from "./diaryController.js";
import userController from "./userController.js";

const router = new Router()

//Get all the info
/* router.get('/info', infoController.index)*/
router.post('/signup', userController.insertUser)

//Create a diary controller.
router.get('/diary', diaryController.readDiary)
router.post('/insertsDiary', diaryController.insertsDiary)
router.put('/updateDiary', diaryController.updateDiary)
router.delete('/deleteDiary', diaryController.deleteDiary)

/* //specific info for id
router.get('/info/:id', infoController.details)  */

export default router