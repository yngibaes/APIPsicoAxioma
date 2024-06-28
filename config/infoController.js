import mysql from 'mysql2/promise'
import db from './database.js';

export default class infoController{
    static async index(req,res){
        let connection;
        try{
            connection = await mysql.createConnection(db)
            const [result] = await connection.execute("SELECT * FROM card")
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

    static async store(req,res){
        let connection;
        try{
            const {name, descri, img} = req.body
            connection = await mysql.createConnection(db)
            console.log(name, descri, img)
            const [result] = await connection.execute("INSERT INTO card (name, descri, img) VALUES (?,?,?)",
            [name, descri, img])
            console.log(result)
        }
        catch(error){
            res.status(500).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }

    static async details(req,res){
        let connection;
        try{
            const id = req.params.id;
            connection = await mysql.createConnection(db)
            console.log(id)
            const [result] = await connection.execute("SELECT * FROM card WHERE id = ?", [id])
            console.log(result)
            res.json(result)
        }
        catch(error){
            res.status(500).json({'error': error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }
}