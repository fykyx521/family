// page/list/list.js
import DB from '../../utils/db.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log('user2'+getApp().user())
    //  let groupid=options.groupoid;
     DB.table('user_group')
      //  .where('groupoid', '=','8e16b3486b') 
     .point('group')
     .point('user') 
     .list().then(res=>{ 
         console.log(res);
         this.setData({ 
             list:res.data.results
         })
     })
    //  api.cloud('list').then(results=>{
    //     console.log(results);
    //  })
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
});
