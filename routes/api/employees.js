var express = require('express');
const { getEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../../controllers/employee.controller');
var router = express.Router();
/* GET employees listing. */
router.get('/', getEmployees);
/* POST - create employee */
router.post('/', createEmployee);
/* GET - to fetch employee details */
/* Let's handle URL Param - id is the URL param*/
router.get('/:id', getEmployeeById);
// PUT - to update employee */
// We have to get both url params and req body 
router.put('/:id', updateEmployee);
// TODO: DELETE - to delete employee 
router.delete('/:id', deleteEmployee);

// we have to get url param 
module.exports = router;
