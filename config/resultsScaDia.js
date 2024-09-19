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

      // Verificar que ResultScanner y userEmail no sean undefined
      if (ResultScanner === undefined || userEmail === undefined) {
        return res
          .status(400)
          .json({ error: "ResultScanner and userEmail are required" });
      }

      connection = await mysql.createConnection(db);

      // Obtener el userID del usuario
      const [userRows] = await connection.execute(
        "SELECT userID FROM user WHERE userEmail = ?",
        [userEmail]
      );

      if (userRows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const userID = userRows[0].userID;

      // Insertar en resultscanner
      const [result] = await connection.execute(
        "INSERT INTO resultscanner (resultScanner, resultScannerDate, userFK) VALUES (?, NOW(), ?)",
        [ResultScanner, userID]
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
          INNER JOIN resultscanner ON user.userID = resultscanner.userFK
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
          INNER JOIN resultscanner ON user.userID = resultscanner.userFK
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
