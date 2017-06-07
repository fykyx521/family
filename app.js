var Bmob = require('utils/bmob.js');
import login from 'utils/login.js';
import cputil from 'utils/cputil.js';
import api from 'utils/api.js';
App({
  onLaunch: function (options) {
        
        Bmob.initialize("a613d7850199a11fc929202507958aa4", "d631329383f295f3130773b5c35fa062");
        
        login.login();
        let that=this;
        // console.log(options.scene,options.shareTicket);
        this.globalData.scene=options.scene;
        this.globalData.shareTicket = options.shareTicket;
        
    },
    onShow: function () {
         console.log('appshow');
    },
    getShare(ticket)
    {
       return new Promise(function(resolve,reject){
         console.log(ticket+'assssssss');
         wx.getShareInfo({
           shareTicket: ticket,
           success: function (res) {
              resolve(res);
           },
           fail(error) {
              reject(error);
           },
         });
       });
    },
    getGroupId(userid,res)
    {
      return new Promise(function (resolve, reject) {
        Bmob.Cloud.run('groupid', { "uid": userid, 'evdata': res.encryptedData,'iv':res.iv }, {
          success: function (result) {
             resolve(result);
          },
          error: function (error) {
             reject(error);
          }
         });
      });
    },
    groupId(ticket)
    {
       let user=Bmob.User.current();
       return this.getShare(ticket)
              .then((res)=>{
                  return this.getGroupId(user.id,res)
              }).then(result=>{
                 return new Promise((resolve, reject) => resolve(JSON.parse(result).openGId));
              });
    },

    onHide: function () {
        console.log('App Hide')
    },
    isFromGroup()
    {
       return this.globalData.scene==1044;
    },
    globalData: {
        hasLogin: false,
        scene:0,
        isFromGroup:false,
        shareTicket:''
    }
});

