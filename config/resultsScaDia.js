import mysql from "mysql2/promise";
import db from "../db/database.js";

export default class resultScaDiarController {
  static async insertsResultDiary(req, res) {
    let connection;
    try {
      const { ResultDiary, diaryID } = req.body;
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        "INSERT INTO resultdiary (resultDiary, diaryFk) VALUES (?,?)",
        [ResultDiary, diaryID]
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
  static async resultDiary(req, res) {
    let connection;
    try {
      const { userEmail } = req.body; // Obtener el email de los parámetros de la consulta
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        `SELECT resultdiary.resultDiary
          FROM user 
          INNER JOIN diary ON user.userID = diary.userFK
          INNER JOIN resultdiary ON diary.diaryID = resultdiary.diaryFK
          WHERE user.userEmail = ?`, [userEmail] // Pasar los parámetros como un array
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
}
