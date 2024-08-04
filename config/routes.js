import { Router } from "express";
import diaryController from "./diaryController.js";
import userController from "./userController.js";

const router = new Router()

router.get('/readUser', userController.readUser)
router.post('/insertUser', userController.insertUser)
router.post('/verifyPhone', userController.verifyPhone)

//Create a diary controller.
router.get('/readAllDiary', diaryController.readAllDiary) 
router.get('/diary', diaryController.readDiary) 
router.post('/insertsDiary', diaryController.insertsDiary)
router.get('/readDiaryById', diaryController.readDiaryById)

//Comentado por ahora
/* router.put('/updateDiary', diaryController.updateDiary)
router.delete('/deleteDiary', diaryController.deleteDiary) 
router.get('/info/:id', infoController.details)  */

export default router