import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [100, 'First name cannot exceed 100 characters'],
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [100, 'Last name cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        index: true,
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        trim: true,
        maxlength: [100, 'Position cannot exceed 100 characters']
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary must be a positive number']
    },
    date_of_joining: {
        type: Date,
        required: [true, 'Date of joining is required'],
        default: Date.now
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true,
        maxlength: [100, 'Department cannot exceed 100 characters']
    },
    picture: {
        type: String,
        default: null,
        maxlength: [6_750_000, 'Picture must be no larger than 5 MB when encoded'],
        validate: {
            validator: (v) => !v || v.startsWith('data:image/'),
            message: 'Picture must be a valid base64 encoded image'
        }
    }
}, {
    timestamps: true
});

employeeSchema.index({ last_name: 1, first_name: 1 });

employeeSchema.methods.toJSON = function() {
    const employee = this.toObject();
    employee.employee_id = employee._id;
    delete employee._id;
    delete employee.__v;
    return employee;
};

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;