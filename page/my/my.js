import Bmob from '../../utils/bmob.js';
Page({
  data: {
    avatarUrl: '',
    nickName: '',
    phone:''
  },
  onLoad() {
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
      path: '/page/user?id=123'
    }
  }
})