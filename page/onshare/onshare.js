// page/onshare/onshare.js
import { groupList, groupId, getGroup, createGroup } from '../../utils/group.js';
import Bmob from '../../utils/bmob.js';
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isSetName:true,
     group:{groupname:''},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 

    wx.showShareMenu({
      withShareTicket: true,
      success: function (ticket) {
        console.log(ticket);
        console.log(ticket);
      }
    });
     console.log(options.ticket);
     app.globalData.ticket=options.ticket;
     app.groupId(options.ticket)
     .then(result=>{  
         console.log('获取群')
         return getGroup(result);//获取群
     })
     .then(results=>{
         if(results.length>0)
         {
            console.log('已建群');
            return new Promise((reslove, reject) => { reslove(results[0])});
             // 已建群记录
         }else{
             // 未建群记录
             console.log('未建群');
             return createGroup(result);
         }
     })
     .then(group=>{
         this.group=group;
     });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})