const Account = require('../app/models/Account');
const Group = require('../app/models/Group');
const GroupRole = require('../app/models/GroupRole');
const Role = require('../app/models/Role');
const { mongooseToObject } = require('../util/mongoose');


async function getRoleUser( user) {
        try{
            if( user ){
                let groupId = user.groupId;
                // let  = {};
                let roles = await Group.findOne({  idrole: groupId })                        
                return roles;
            } else {
                console.log(" user is not valid");
            }
        } catch (err) {
            return err;
        }
}
module.exports = {
    getRoleUser: getRoleUser
}


