const express = require('express');
const routes = express.Router();

const {
    getStudents,
    postStudent,
    patchStudent,
    deleteStudentController
} = require('../controllers/studentControllers');

routes.get('/', getStudents);
routes.post('/', postStudent);
routes.patch('/:name', patchStudent);
routes.delete('/:name', deleteStudentController);

module.exports = routes;