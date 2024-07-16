<<<<<<< HEAD:config/userController.js
import db from "./database";
import mysql from "mysql2/promise";
=======
import mysql from 'mysql2/promise'
import db from '../db/database.js';
>>>>>>> ad6adb69fa5e4926cbe7e6bfb53e31a040dac6c9:config/infoController.js

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
            
            const {userName, userPhone, userEmail, userPassword} = req.body
            connection = await mysql.createConnection(db)
            console.log(userName, userPhone, userEmail, userPassword)
            const [result] = await connection.execute("INSERT INTO user (userName, userPhone, userEmail, userPassword) VALUES (?,?,?,?,?)",
            [userName, userPhone, userEmail, userPassword])
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
}