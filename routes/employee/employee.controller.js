import Employee from "../../models/employee.js";

export const list = async (req, res) => {
    const query = req.query.query;

    let filter = {};
    if (query) {
        filter = {
            $or: [
                { first_name: { $regex: query, $options: 'i' } },
                { last_name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { position: { $regex: query, $options: 'i' } },
                { department: { $regex: query, $options: 'i' } }
            ]
        };
    }

    const employees = await Employee.find(filter);
    res.status(200).json(employees);
}

export const create = async (req, res) => {
    const employee = await Employee.findOne({
        email: req.body.email
    });
    if (employee) {
        const error = new Error(`Employee with email ${req.body.email} already exists.`);
        error.name = 'ConflictError';
        error.status = 409;
        throw error;
    }
    const newEmployee = await Employee.create(req.body);

    res.status(201).json({
        message: "Employee created successfully",
        employee_id: newEmployee._id
    });
}

export const getById = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        const error = new Error('Employee not found');
        error.name = 'NotFoundError';
        error.status = 404;
        throw error;
    }
    res.status(200).json(employee);
}

export const updateById = async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!employee) {
        const error = new Error('Employee not found');
        error.name = 'NotFoundError';
        error.status = 404;
        throw error;
    }

    res.status(200).json({
        message: "Employee updated successfully",
        employee: employee
    });
}

export const deleteById = async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.query.eid);

    if (!employee) {
        const error = new Error('Employee not found');
        error.name = 'NotFoundError';
        error.status = 404;
        throw error;
    }

    res.status(204).json();
}