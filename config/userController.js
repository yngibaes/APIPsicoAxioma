
import db from '../db/database.js';
import mysql from "mysql2/promise";

export default class userController {
    static async readUser(req,res){
        let connection;
        try{
            connection = await mysql.createConnection(db)
            const [result] = await connection.execute("SELECT * FROM user")
            console.log(result)
            res.json(result)
        }
        catch(error){
            res.status(500).json({'error': error.message})
        }
        finally{ /*Cierre del ciclo*/
            if(connection){
                await connection.end()
            }
        }
    }
    static async insertUser(req,res){
        let connection;
        try{
            const {userName, userEmail, userPhone, userPassword} = req.body
            connection = await mysql.createConnection(db)
            console.log(userName, userEmail, userPhone, userPassword)
            const [result] = await connection.execute("INSERT INTO user (userName, userEmail, userPhone, userPassword) VALUES (?,?,?,?)",
            [userName, userEmail, userPhone, userPassword])
            console.log(result)
            res.status(200).send('Usuario creado con éxito');
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
}