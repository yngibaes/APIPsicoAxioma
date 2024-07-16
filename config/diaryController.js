import mysql from 'mysql2/promise'
import db from './database.js';

export default class diaryController{
    static async readDiary(req,res){
        let connection;
        try{
            connection = await mysql.createConnection(db)
            const [result] = await connection.execute("SELECT * FROM diary")
            console.log(result)
            res.json(result)
        }
        catch(error){
            res.status(404).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }
   static async insertsDiary(req,res){
        let connection;
        try{
            const {diaryTitle, diaryContent, diaryDate, userFk} = req.body
            connection = await mysql.createConnection(db)
            console.log(diaryTitle, diaryContent, diaryDate, userFk)
            const [result] = await connection.execute("INSERT INTO diary (diaryTitle, diaryContent, diaryDate, userFk) VALUES (?,?,?,?)",
            [diaryTitle, diaryContent, diaryDate, userFk])
            console.log(result)
        }
        catch(error){
            res.status(404).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }
    static async updateDiary(req,res){
        let connection;
        try{
            const {diaryTitle, diaryContent, diaryDate, diaryID} = req.body
            connection = await mysql.createConnection(db)
            console.log(diaryTitle, diaryContent, diaryDate, diaryID)
            const [result] = await connection.execute("UPDATE diary SET diaryTitle=?, diaryContent=?, diaryDate=? WHERE diaryID=?", [diaryTitle, diaryContent, diaryDate, diaryID])
            console.log(result)
        }
        catch(error){
            res.status(404).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }
    static async deleteDiary(req,res){
        let connection;
        try{
            const {diaryID} = req.body
            connection = await mysql.createConnection(db)
            console.log(diaryID)
            const [result] = await connection.execute("DELETE FROM diary WHERE diaryID=?",
            [diaryID])
            console.log(result)
        }
        catch(error){
            res.status(404).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }
}