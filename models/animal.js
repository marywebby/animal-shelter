const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model {}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    animal: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }, 
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hypoallergenic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sex: {
        type: DataTypes.BOOLEAN, 
        allowNull: false
    },
    isMissing: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lastSeen: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'animal',
  }
);

module.exports = Animal;

// hypo = true -> yes 
// hypo = false -> no 
// animal = true -> dog 
// animal = false -> cat 
// sex = true -> female
// sex = false -> male 
