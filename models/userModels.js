// Exporta un objeto que define el modelo de la tabla de usuarios. Este objeto se utiliza en el archivo db/database.js para crear la tabla de usuarios en la base de datos.

import DataTypes from 'sequelize';

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Asegura que el campo email tenga un formato de correo electrónico válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

const DiaryEntryModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nombre de la tabla de usuarios
      key: 'id',
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  // Otros campos según sea necesario
};

module.exports = {UserModel, DiaryEntryModel};