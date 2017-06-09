
import api from './api.js';
import Bmob from './bmob.js'


export default class Role {

    static createRole(rolename)
    {
       var roleACL = new Bmob.ACL();
       roleACL.setPublicReadAccess(true);
       var role = new Bmob.Role(rolename, roleACL);
       return role.save();
    }

}



