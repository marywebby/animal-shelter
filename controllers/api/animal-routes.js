const router = require('express').Router();
const { Animal } = require('../../models');

// ROUTE FOR ALL ANIMALS
router.get('/', async (req, res) => {
  try {
    const allAnimals = await Animal.findAll({
    }); 

    if (!allAnimals) {
      res.status(404).json({ message: 'Cannot find cats or dogs!' });
      return;
    }

    res.status(200).json(allAnimals);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE FOR GETTING ONLY CATS 

router.get('/cats', async (req, res) => {
  try {
    const onlyCats = await Animal.findAll({
      where: {
        animal: false,
      },
    }); 

    if (!onlyCats) {
      res.status(404).json({ message: 'Cannot find cats!' });
      return;
    }

    res.status(200).json(onlyCats);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTES FOR GETTING ONLY DOGS

router.get('/dogs', async (req, res) => {
  try {
    const onlyDogs = await Animal.findAll({
      where: {
        animal: true,
      },
    }); 

    if (!onlyDogs) {
      res.status(404).json({ message: 'Cannot find cats!' });
      return;
    }

    res.status(200).json(onlyDogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE FOR GETTING ONLY HYPOALLERGENIC ANIMALS

router.get('/hypoallergenic', async (req, res) => {
  try {
    const onlyHypo = await Animal.findAll({
      where: {
        hypoallergenic: true,
      },
    }); 

    if (!onlyHypo) {
      res.status(404).json({ message: 'Cannot find hypoallergenic animals!' });
      return;
    }

    res.status(200).json(onlyHypo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ROUTE FOR GETTING ONLY FEMALE ANIMALS 

router.get('/female', async (req, res) => {
  try {
    const onlyFemale = await Animal.findAll({
      where: {
        sex: true,
      },
    }); 

    if (!onlyFemale) {
      res.status(404).json({ message: 'Cannot find Female animals!' });
      return;
    }

    res.status(200).json(onlyFemale);
  } catch (err) {
    res.status(500).json(err);
  }
});

// MALE BUTTON 

router.get('/male', async (req, res) => {
  try {
    const onlyMale = await Animal.findAll({
      where: {
        sex: false,
      },
    }); 

    if (!onlyMale) {
      res.status(404).json({ message: 'Cannot find Male animals!' });
      return;
    }

    res.status(200).json(onlyMale);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/isMissing', async (req, res) => {
  try {
    const isMissing = await Animal.findAll({
      where: {
        isMissing: true,
      },
    }); 

    if (!isMissing) {
      res.status(404).json({ message: 'Cannot find missing animals!' });
      return;
    }

    res.status(200).json(isMissing);
  } catch (err) {
    res.status(500).json(err);
  }
});

// hypo = true -> yes
// hypo = false -> no
// animal = true -> dog
// animal = false -> cat
// sex = true -> female
// sex = false -> male

module.exports = router;