const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if(!employees) return res.status(204).json({'message': 'No employees found'});
}

const createNewEmployee =  async (req, res) => {
    if(!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(404).json({'message': 'firstname or lastname are required'});
    }

    try{
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        })
        res.status(200).json(result)
    }catch(err){
        console.error(err);
    }

}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({ 'message':'id parameter is required'})
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec()

    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 'message': "Employee Id is required"});
    const employee = await Employee.findOne({_id: req.body.id}).exec()
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id} not found` });
    }
    const result = await employee.deleteOne({_id: req.body.id})
    res.json(result)
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': "Employee Id is required"});
    const employee = await Employee.findOne({_id: req.params.id}).exec()
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id} not found` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}