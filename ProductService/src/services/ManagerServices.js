require("dotenv").config();
const Employee = require('../app/models/Employee');

async function showEmployee(){
    const allEmployee = await Employee.find().select('Name _id Email');
    return allEmployee;
}

async function createEmployee (Name, Password, Phone, Email, Online , Description) {
    return new Promise( async (resolve, reject) => {
        try{
            let data = {};
            let existEmployee = await Employee.findOne( {Email});
            console.log(existEmployee);
            if( existEmployee ){
                data = {
                    ER: false,
                    MES: "Employee is exist"
                }
            } else {
                let newEmployee = new Employee({
                    Name: Name,
                    Password: Password,
                    Email: Email,
                    Phone: Phone,
                    Online: Online
                })
                let document = await newEmployee.save();
                data = {
                    ER: true,
                    MES: "Succesfully Created Employed"
                }
                console.log(`Created New Employee with ${document._id.toString()}`);
            } 
            resolve(data);
        } catch ( error){
            reject(error);
        }
    })
}

async function updateEmployee(Id, Name, Phone, Email, Online , Description) {
    return new Promise( async (resolve, reject) => {
        try {
            data = {}
            let checkEmail;
            let existEmployee = await Employee.findById(Id).select("Email");
            console.log(existEmployee)
            if( existEmployee.Email === Email ){
                checkEmail = true
            } else {
                checkEmail = false
            }
            if( checkEmail) {
                let updateEmp = await Employee.updateOne({ _id: Id}, {
                    Name: Name,
                    Email: Email,
                    Phone: Phone,
                    Description: Description
                }).then(() => "Successfully Update Employee");
                data = {
                    ER: true,
                    MES: "Successfully"
                }
                
            } else {
                data = {
                    ER: false,
                    MES: "Employee is exist"
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })

}

async function deleteEmployee( Id ){
    return new Promise( async (resolve, reject) => {
        try {
            let data = {}
            Employee.deleteOne({ _id : Id });
            data = {
                ER: true,
                MES: "Successfully"
            }
            console.log(data.ER);
            if( data.ER) {
                console.log("Deleted Employee with _id: ", Id);
            } else {
                console.log("Delete Fail !!!")
            }
            resolve( data);
        } catch ( error ){
            reject( error);
        }

    })
}
module.exports = {
    createEmployee: createEmployee,
    showEmployee: showEmployee,
    updateEmployee: updateEmployee,
    deleteEmployee: deleteEmployee
    
}