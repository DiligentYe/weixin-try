// moviedetail.js
var detailUrl = 'https://api.douban.com/v2/movie/subject/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id);
    // 发送请求数据
    wx.request({
      url: detailUrl + options.id,
      data: {
      },
      // 必须采用POST方法请求数据
      method: 'POST',
      success: function(res) {
        that.data.detail = res.data;
        // 处理演员和导演字符串
        var casts = that.data.detail.casts;
        var castsStr = '';
        var directors = that.data.detail.directors;
        var directorsStr = '';
        for (var i = 0; i < casts.length; ++i) {
          if(i != casts.lengt - 1 ) {
            castsStr += casts[i].name + ' / ';
          } else {
            castsStr += casts[i].name;
          }
        }
        for (var i = 0; i < directors.length; ++i) {
          if (i != directors.length - 1) {
            directorsStr += directors[i].name + ' / ';
          } else {
            directorsStr += directors[i].name;
          }
        }
        that.data.detail.castsStr = castsStr;
        that.data.detail.directorsStr = directorsStr;

        that.setData({
          detail: res.data
        });
      }
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