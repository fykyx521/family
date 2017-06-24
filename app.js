var Bmob = require('utils/bmob.js');
import login from 'utils/login.js';
import cputil from 'utils/cputil.js';
import api from 'utils/api.js';
import Role from 'utils/role.js';
import { groupId, getOrCreateGroup, createOrInsertUG} from 'utils/group.js';
import user from 'utils/user.js';
App({
  onLaunch: function (options) {
        
        Bmob.initialize("a613d7850199a11fc929202507958aa4", "d631329383f295f3130773b5c35fa062");
        
        
        let that=this;
        // console.log(options.scene,options.shareTicket);
        this.globalData.scene=options.scene;
        this.globalData.shareTicket = options.shareTicket;

        // this.init(options.shareTicket);
        // api.query('user_group').find().then(results=>{  
        //     console.log('group');
        //     console.log(results);    
        // })
    },

    init(ticket)  
    { 
        
       let cuser=null;
       login().then(user => {
         cuser=user;
         console.log('login'+user);
        if (this.isFromGroup()) { 
           return groupId(ticket, user.id);//获取群ID
        } 
       })
        .then((openGid) => {
           return getOrCreateGroup(openGid);
        }) 
        .then((group)=>{
          console.log(group);
          //  let user = Bmob.Object.createWithoutData("_User", cuser.id);
           return createOrInsertUG(group,cuser);
           

        }).then((model)=>{
           console.log('save scuc');
           console.log(model);
        })
    },
    
    onShow: function () {
         console.log('appshow');
    },
    
    onHide: function () {
        console.log('App Hide')
    },
    isFromGroup()
    {
       return this.globalData.scene==1044;
    },
    user()
    {
      return user;
    },
    globalData: {
        hasLogin: false,
        scene:0,
        isFromGroup:false,
        shareTicket:''
    }
});

