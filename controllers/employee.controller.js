const { validationResult } = require('express-validator');
const Employee = require('../models/employee');

/* GET employees listing. */
exports.getEmployees = ((req, res, next) => {
    res.status(200);
    // res.json(employees);
    Employee.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        }
        else {
            res.send(err);
        }
    })
});

/* POST - create employee */
exports.createEmployee = (req, res, next) => {
    console.log(req.body);
    //   res.status(200);
    //   res.json({
    //     id: index, ...req.body
    //   });
    //   // Populating the employees array with the new data received
    //   employees.push({id: index, ...req.body})
    //   index++;
    // 2. exec query 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const employeeDao = new Employee(req.body);
    employeeDao.save((err, data) => { // 3. get the data/status from db
        // 4. send the data/status back to rest api client 
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
            res.send(err);
        }
    });
};

// Getting employees by their ids
exports.getEmployeeById = (req, res, next) => {
    // const id = req.params.id;
    // console.log(id);
    // if (employees.find(employee => employee.id == id)) {
    //     res.status(200);
    //     res.json(
    //         employees[id - 1]
    //     );
    // }
    // else {
    //     res.status(404);
    //     res.json('No such employee exits');
    // }
    Employee.findOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
            res.send(err);
        }
    });
};

// Putting data in the employees array
exports.updateEmployee = (req, res, next) => {
    // const id = req.params.id;
    // console.log(id);
    // employees.splice(id - 1, 1, { id: id, ...req.body })
    // if (employees.find(employee => employee.id == id)) {
    //     res.status(201);
    //     res.json(
    //         employees[id - 1]
    //     );
    // }
    // else {
    //     res.status(404);
    //     res.json('No such employee exits');
    // }
    console.log(req.body);
    console.log(req.params.id);
    Employee.updateOne({ _id: req.params.id }, req.body, (err, data) => {
        if (!err) {
            console.log(data);
            if (data.acknowledged && data.modifiedCount == 1) {
                res.send({ status: 'Updated Successfully!' });
            }
        } else {
            console.log(err);
            res.send(err);
        }
    });
};
//npm i sequelize mysql2
// Deleting employee from employees array
exports.deleteEmployee = (req, res, next) => {
    // const id = req.params.id;
    // console.log(id);
    // if (employees.find(employee => employee.id == id)) {
    //     employees.splice(id - 1, 1);
    //     res.status(200);
    //     res.json("Deleted Successfully"
    //     );
    // }
    // else {
    //     res.status(404);
    //     res.json('No such employee exits');
    // }
    Employee.remove({ _id: req.params.id }, (err, data) => {
        if (!err) {
            console.log("Deleted Successfully");
            res.send(data);
        } else {
            console.log(err);
            res.send('Error occured');
        }
    });

};

