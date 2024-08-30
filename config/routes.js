import { Router } from "express";
import diaryController from "./diaryController.js";
import userController from "./userController.js";
import resultScaDiarController from "./resultsScaDia.js";

const router = new Router()

router.get('/readUser', userController.readUser)
router.post('/insertUser', userController.insertUser)
router.post('/verifyPhone', userController.verifyPhone)
router.get('/readPhone', userController.readPhone)
router.post('/updateUser', userController.updateUser)
router.delete('/deleteUser', userController.deleteUser)
-
//Create a diary controller.
router.get('/readAllDiary', diaryController.readAllDiary) 
router.get('/diary', diaryController.readDiary) 
router.post('/insertsDiary', diaryController.insertsDiary)
router.get('/readDiaryById', diaryController.readDiaryById)

//Create a resultScaDia controller.
router.post('/insertsResultDiary', resultScaDiarController.insertsResultDiary)
router.get('/resultDiary', resultScaDiarController.resultDiary)

//Comentado por ahora
/* router.put('/updateDiary', diaryController.updateDiary)
router.delete('/deleteDiary', diaryController.deleteDiary) 
router.get('/info/:id', infoController.details)  */

export default router