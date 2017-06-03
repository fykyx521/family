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
        wx.getShareInfo({
          shareTicket: this.globalData.shareTicket,
          success:function(data) 
          {
             let evdata=data.encryptedData;
             let iv=data.iv; 
             let msg=data.errMsg;     
             console.log('adasdasd');  
             wx.request({
               url: 'https://cloud.bmob.cn/2401ae597b8dfe23/groupid',
               method:"POST",   
              //  dataType:'string',
               data: { "uid":"b0d3d3922d","iv":iv,"evdata":evdata},
               header:{
                 "X-Bmob-Application-Id":'a613d7850199a11fc929202507958aa4',
                 "X-Bmob-REST-API":'d631329383f295f3130773b5c35fa062',
                 'content-type':'application/json'
               },  
               success:function(data)
               {
                  console.log(data);
               }
             })
             
          }
          
        });

        
    },
    onShow: function () {
         console.log('appshow');
         


    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        scene:0,
        shareTicket:''
    }
});

