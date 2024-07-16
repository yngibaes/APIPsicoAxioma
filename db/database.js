const db = {
    host:'localhost',
    port: 3306,
    user:'root',
    password: '',
    database: 'psicoaxioma'
}

// Conectar a la base de datos
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
  });

export default db