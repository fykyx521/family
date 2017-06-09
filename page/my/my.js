import { groupList} from '../../utils/group.js';
import Bmob from '../../utils/bmob.js';
import { getGrouplist } from '../../utils/group.js';
let app=getApp();
Page({
  data: {
    avatarUrl: '',
    nickName: '',
    phone:''
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket:true,
      success:function(ticket)
      {
         
      }
    });

    // let groupid = options.groupoid;
    getGrouplist('GCeYK0acImH5zL6MpbgjDdpvkUZA').then((results) => {
      console.log('dasadasdasd33333333');
      console.log(results[0].get('user').get('mobilePhoneNumber'));
      console.log('dasadasdasd4444444444');
    })

    if (app.isFromGroup()) {
      //  app.groupId().then(groupid=>{
          
      //    groupList(groupid).then(results=>{
      //         console.log("sdfsdfddd"+results);
      //      })
      //  });   
    }
    let that = this;
    let user=Bmob.User.current();
    this.setData({
       nickName: user.get('nickName'),
       phone:user.get('mobilePhoneNumber'),
       avatarUrl: user.get('userPic')  

    });
  },
  onShareAppMessage: function () {
    return {
      title: this.nickName,
      path: '/page/user?id=123',
      success: function (res) {
         let ticket = res.shareTickets[0];
         wx.navigateTo({
           url: '/page/onshare/onshare?ticket='+ticket,
         });
        
        

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
});