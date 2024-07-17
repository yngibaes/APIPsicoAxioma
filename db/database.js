// Import the mysql module
import mysql from 'mysql2';

const db = {
    host:'localhost',
    port: 3306,
    user:'root',
    password: '',
    database: 'psicoaxioma'
}

// Create a connection to the database
const connection = mysql.createConnection(db);

// Connect to the database
connection.connect(error => {
    if (error) {
        console.error('An error occurred while connecting to the DB:', error);
        return;
    }
    console.log('Successfully connected to the database.');
});

export default {db, connection};