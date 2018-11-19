const router = require('express').Router();
const Student = require('../db/models/student');
const Test = require('../db/models/test');

router.get('/', async (req, res, next) => {
  try {
    const response = await Student.findAll();
    res.json(response);
  } catch (error) {
    next(error);
  }
})

router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      res.sendStatus(404);
    } else {
      res.json(student);
    }
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    let newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    res.status(201).json(newStudent)
  } catch (error) {
    next(error);
  }
})

router.put('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const updatedStudent = await student.update(req.body);
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
})

router.delete('/:studentId', async (req, res, next) => {
  try {
    await Student.destroy({where: { 
      id: req.params.studentId
    }});
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
