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
    
    console.log('user:'+getApp().user());
    wx.showShareMenu({
      withShareTicket:true,
      success:function(res)
      {
         
      }
    });

    // let groupid = options.groupoid;
  

    // if (app.isFromGroup()) {
     
    // }
    // let that = this;
    // let user=Bmob.User.current();
    // this.setData({
    //    nickName: user.get('nickName'),
    //    phone:user.get('mobilePhoneNumber'),
    //    avatarUrl: user.get('userPic')  

    // });
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