import db from "../db/database.js";
import mysql from "mysql2/promise";

export default class userController {
  static async readUser(req, res) {
    let connection;
    try {
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute("SELECT * FROM user");
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      /*Cierre del ciclo*/
      if (connection) {
        await connection.end();
      }
    }
  }
  static async insertUser(req, res) {
    let connection;
    try {
      const { userName, userEmail, userPhone } = req.body;
      connection = await mysql.createConnection(db);
      console.log(userName, userEmail, userPhone);
      const [result] = await connection.execute(
        "INSERT INTO user (userName, userEmail, userPhone) VALUES (?,?,?)",
        [userName, userEmail, userPhone]
      );
      console.log(result);
      res.status(200).send("Usuario creado con éxito");
    } catch (error) {
      res.status(404).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
  static async verifyPhone(req, res) {
    let connection;
    try {
      // Obtener userPhone de los parámetros de la solicitud
      const userPhone = req.body.userPhone; // Asumiendo que es una solicitud POST. Cambiar a req.query.userPhone si es GET.

      connection = await mysql.createConnection(db);
      // Buscar en la base de datos por userPhone
      const [result] = await connection.execute(
        "SELECT userPhone FROM user WHERE userPhone = ?",
        [userPhone]
      );

      if (result.length > 0) {
        // Si se encuentra el userPhone, enviar confirmación
        res.json({
          message: "El número de teléfono existe en la base de datos.",
        });
      } else {
        // Si no se encuentra, informar que no existe
        res.json({
          message: "El número de teléfono no existe en la base de datos.",
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
}
