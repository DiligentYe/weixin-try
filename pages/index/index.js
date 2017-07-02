//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  /**
   * 清除本地数据
   */
  clearData: function () {
    // 清除本地存储的数据
    try {
      wx.removeStorageSync("my_movie");
    } catch (e) {
      console.log('清除本地存储的数据');
    }
  },

  /**
   * 展示我的收藏
   */
  showCollection: function () {
    // // 更新数据
    // try {
    //   this.data.myMovies = this.data.wx.getStorageSync("my_movie");
    // } catch (e) {
    //   console.log(e);
    // }
    // // 更新视图
    // this.setData({
    //   myMovies: this.data.myMovies
    // });
    wx.navigateTo({
      url: '../../pages/mymovie/mymovie'
    })
  }

  
})
