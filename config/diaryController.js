import mysql from "mysql2/promise";
import db from "../db/database.js";

export default class diaryController {
  // Método para leer todos los diarios
  static async readAllDiary(req, res) {
    let connection;
    try {
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(`SELECT * FROM diary`);
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }

  // Método para leer un diario específico
  static async readDiary(req, res) {
    let connection;
    try {
      const { userEmail } = req.query; // Obtener el email de los parámetros de la consulta
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        `SELECT diary.diaryID, diary.diaryTitle, diary.diaryDate, diary.diaryContent 
         FROM user 
         INNER JOIN diary ON user.userID = diary.userFK 
         WHERE user.userEmail = ?`,
        [userEmail] // Pasar los parámetros como un array
      );
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }

  // Método para leer un diario específico por ID
  static async readDiaryById(req, res) {
    let connection;
    try {
      const { diaryID } = req.query; // Obtener el ID del diario de los parámetros de la consulta
      console.log('Received diaryID:', diaryID); // Log the received diaryID
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        `SELECT diary.diaryID, diary.diaryTitle, diary.diaryDate, diary.diaryContent FROM diary WHERE diary.diaryID = ?`,
        [diaryID] // Pasar el ID del diario como un parámetro
      );
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }

  // Método para insertar un diario
  static async insertsDiary(req, res) {
    let connection;
    try {
      const { diaryTitle, diaryContent, userEmail } = req.body;
      connection = await mysql.createConnection(db);
      const [userResult] = await connection.execute(
        "SELECT userID FROM user WHERE userEmail=?",
        [userEmail]
      );
      const userID = userResult[0]?.userID;
      if (!userID) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      console.log(diaryTitle, diaryContent, userID);
      const [result] = await connection.execute(
        "INSERT INTO diary (diaryTitle, diaryContent, diaryDate, userFk) VALUES (?,?,NOW(),?)",
        [diaryTitle, diaryContent, userID]
      );
      console.log(result);
      res.status(200).send("Enviado con éxito");
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
  /* static async updateDiary(req, res) {
    let connection;
    try {
      const { diaryTitle, diaryContent, diaryDate, diaryID } = req.body;
      connection = await mysql.createConnection(db);
      console.log(diaryTitle, diaryContent, diaryDate, diaryID);
      const [result] = await connection.execute(
        "UPDATE diary SET diaryTitle=?, diaryContent=?, diaryDate=? WHERE diaryID=?",
        [diaryTitle, diaryContent, diaryDate, diaryID]
      );
      console.log(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
  static async deleteDiary(req, res) {
    let connection;
    try {
      const { diaryID } = req.body;
      connection = await mysql.createConnection(db);
      console.log(diaryID);
      const [result] = await connection.execute(
        "DELETE FROM diary WHERE diaryID=?",
        [diaryID]
      );
      console.log(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  } */
}
