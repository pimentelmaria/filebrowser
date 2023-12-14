// models/folder.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Folder = sequelize.define('Folder', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add more fields as needed
  });

  return Folder;
};
