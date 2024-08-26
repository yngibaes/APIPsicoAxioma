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
}
