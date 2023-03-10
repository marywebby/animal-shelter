const sequelize = require('../config/connection');
const { User, Animal } = require('../models');

const userData = require('./userData.json');
const animalData = require('./animalData.json');

const seedDatabase = async () => {
        return sequelize.sync({ 
            force: true 
          })
          .then(() => {
            User.bulkCreate(userData)
            .then(() => {
              Animal.bulkCreate(animalData)
              .then(() => {
                console.log('All Seeds Planted'); 
              });
            });
          });
        process.exit(0);
      };

seedDatabase();