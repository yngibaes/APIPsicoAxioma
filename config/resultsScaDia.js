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
      const { userEmail } = req.query; // Obtener el email de los parámetros de la consulta
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        `SELECT resultdiary.resultDiary, resultdiary.diaryFK, diary.diaryDate
          FROM user 
          INNER JOIN diary ON user.userID = diary.userFK
          INNER JOIN resultdiary ON diary.diaryID = resultdiary.diaryFK
          WHERE user.userEmail = ?
          ORDER BY resultdiary.diaryFK DESC
          LIMIT 7`,
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
  static async insertsResultScanner(req, res) {
    let connection;
    try {
      const { ResultScanner } = req.body;
      const { userEmail } = req.query;
      connection = await mysql.createConnection(db);
      const user = await connection.execute(
        "SELECT userID FROM user WHERE userEmail = ?",
        [userEmail]
      );
      const [result] = await connection.execute(
        "INSERT INTO resultscanner (resultScanner, resultScannerDate, userFK) VALUES (?,NOW(),?)",
        [ResultScanner, user]
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
  static async resultScanner(req, res) {
    let connection;
    try {
      const { userEmail } = req.query; // Obtener el email de los parámetros de la consulta
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        `SELECT resultscanner.resultScanner, resultscanner.resultScannerDate
          FROM user 
          INNER JOIN resultscanner ON user.userID = resultScanner.userFK
          WHERE user.userEmail = ?
          ORDER BY resultscanner.resultScannerDate DESC
          LIMIT 7`,
        [userEmail]
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
  static async calendaryDiary(req, res) {
    let connection;
    try {
      const { userEmail } = req.query; // Obtener el email de los parámetros de la consulta
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        `SELECT resultdiary.resultDiary, resultdiary.diaryFK, diary.diaryDate
          FROM user 
          INNER JOIN diary ON user.userID = diary.userFK
          INNER JOIN resultdiary ON diary.diaryID = resultdiary.diaryFK
          WHERE user.userEmail = ?
          ORDER BY resultdiary.diaryFK DESC`,
        [userEmail]
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
  static async calendaryScanner(req, res) {
    let connection;
    try {
      const { userEmail } = req.query; // Obtener el email de los parámetros de la consulta
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute(
        `SELECT resultscanner.resultScanner, resultscanner.resultScannerDate
          FROM user 
          INNER JOIN resultscanner ON user.userID = resultScanner.userFK
          WHERE user.userEmail = ?
          ORDER BY resultscanner.resultScannerDate DESC`,
        [userEmail]
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
