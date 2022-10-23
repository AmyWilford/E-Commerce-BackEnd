// Import Model and Datatypes from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import sequelize connection
const sequelize = require('../config/connection.js');
// Initialize Product Category (table) by extending off Sequelize's Model class
class Category extends Model {}

// Establish Cateogry Model fields and rules
Category.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// Export Category Model
module.exports = Category;
