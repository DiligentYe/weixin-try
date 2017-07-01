// intheaters.js
//获取应用实例
var app = getApp();
var loadUrl = 'https://api.douban.com/v2/movie/in_theaters';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 当前显示的电影数据
    inTheaterMovie: [],
    // 总电影个数
    total: 0,
    // 每次请求电影个数
    requestCount: 10,
    // 请求起始位置
    start: 0,
    // 是否已经加载全部
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 发送请求数据
    wx.request({
      url: loadUrl,
      data: {
        "start": this.data.start,
        "count": this.data.requestCount
      },
      // 必须采用POST方法请求数据
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      // 请求数据成功之后,重新渲染页面
      success: function (res) {
        that.data.inTheaterMovie = that.data.inTheaterMovie.concat(res.data.subjects);
        that.setData({
          inTheaterMovie: that.data.inTheaterMovie,
          start: that.data.requestCount + that.data.start,
          total: res.total
        }); 
      },
      fail: function(res) {
        console.log('error');
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 发送请求数据
    wx.request({
      url: loadUrl,
      data: {
        "start": this.data.start,
        "count": this.data.requestCount
      },
      // 必须采用POST方法请求数据
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      // 请求数据成功之后,重新渲染页面
      success: function (res) {
        if (res.data.subjects.length != 0) {
          that.data.inTheaterMovie = that.data.inTheaterMovie.concat(res.data.subjects);
          that.setData({
            inTheaterMovie: that.data.inTheaterMovie,
            start: that.data.requestCount + that.data.start,
            total: res.total
          });
        } else {
          that.setData({
            isEnd: true
          });
        }
      },
      fail: function (res) {
        console.log('error');
      }
    });
  },

  /**
   * 显示电影详情
   */
  showDetail: function (event) {
    console.log(event.target.dataset.id);
    // 导航到电影详情页面
    wx.navigateTo({
      url: "../../pages/moviedetail/moviedetail?id=" + event.target.dataset.id
    });
  }
})