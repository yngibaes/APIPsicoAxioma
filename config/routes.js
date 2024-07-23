import { Router } from "express";
import diaryController from "./diaryController.js";
import userController from "./userController.js";

const router = new Router()

//Get all the info
/* router.get('/info', infoController.index)*/
router.get('/readUser', userController.readUser)
router.post('/insertUser', userController.insertUser)
router.post('/verifyPhone', userController.verifyPhone)

//Create a diary controller.
router.get('/diary', diaryController.readDiary) 
router.post('/insertsDiary', diaryController.insertsDiary)
router.put('/updateDiary', diaryController.updateDiary)
router.delete('/deleteDiary', diaryController.deleteDiary)

/* //specific info for id
router.get('/info/:id', infoController.details)  */

export default router