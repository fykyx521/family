import { groupList} from '../../utils/group.js';
import Bmob from '../../utils/bmob.js';
let app=getApp();
Page({
  data: {
    avatarUrl: '',
    nickName: '',
    phone:''
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket:true
    });

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