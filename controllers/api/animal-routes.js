const router = require('express').Router();
const { Animal } = require('../../models');

router.get('/', async (req, res) => {
  
    try {
      const testData = await Animal.findAll({
        where: {
          name: req.name,
        },
      }); 
  
      if (!testData) {
        res.status(404).json({ message: 'Cannot find animals!' });
        return;
      }
  
      res.status(200).json(testData);
    } catch (err) {
      res.status(500).json(err);
    }
  
  });