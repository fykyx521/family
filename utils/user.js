
import Bmob from './bmob.js';



Object.assign(Bmob.User.prototype, {
  hasPhone() { 
    return this.get('mobilePhoneNumber').length==11;
  },
  grouplist() {

  }
});
let user = Bmob.User.current();
export default user;