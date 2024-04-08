const managerService = require('../../services/ManagerServices')
const { PublishMessage} = require('../../util/index');
const { sendOTP }= require('../../rabbitMQ/sendOTP');
class ManagerPermissionController {

    // [GET] /manager/api/showemployee
    async managerRole( req, res, next){
        const dataEmployee = await managerService.showEmployee();

        return res.status(201).json(dataEmployee)
    }


    // [POST] /manager/api/createemployee
    async createEmployee( req, res, next){
        let { Name, Password, Phone, Email, Online , Description} = req.body;
        if( !Name || !Password || !Phone || !Email || !Online ){
            return res.status(500).json({
                Success: false,
                Data: ""
            })
        }
        let data = await managerService.createEmployee( Name, Password, Phone, Email, Online , Description);

        return res.status(200).json({MESS: 'OK'});
    }

    // [PUT] /manager/api/updateemploy/:id
    async updateEmploy( req, res, next) {
        let { Name, Password, Phone, Email, Online , Description} = req.body;
        let id = req.params.id;
        if( !Name || !Phone || !Email ){
            return res.status(500).json({
                Success: false,
                Data: ""
            })
        }
        let data = await managerService.updateEmployee(id, Name, Phone, Email, Online , Description)
        
        return res.status(200).json({
            MES: 'OK'
        });
    }

    async deleteEmployee( req, res, next ){
        let id = req.params.id;
        let data = await managerService.deleteEmployee( id );
        return res.status(200).json(data);
    }

    
}

module.exports = new ManagerPermissionController;