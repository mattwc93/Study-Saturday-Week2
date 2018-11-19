const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

router.get('/:testId', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.testId);
    res.json(test);
  } catch (error) {
    next(error);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const newTest = await Test.create(req.body);
    const student = await Student.findById(req.params.studentId);
    newTest.setStudent(student);
    res.status(201).send(newTest);
  } catch (error) {
    next(error);
  }
});

router.delete('/:testId', async (req, res, next) => {
  await Test.destroy({where: {
    id: req.params.testId
  }});
  res.sendStatus(204);
});

module.exports = router;
