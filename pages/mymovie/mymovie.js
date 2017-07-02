// mymovie.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储已经添加收藏电影信息
    inTheaterMovie: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 更新数据
    try {
      this.data.inTheaterMovie = wx.getStorageSync("my_movie");
    } catch (e) {
      console.log(e);
    }
    // 更新视图
    this.setData({
      inTheaterMovie: this.data.inTheaterMovie
    });
    console.log('aa');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isChangeLocal){
      // 更新数据
      try {
        this.data.inTheaterMovie = wx.getStorageSync("my_movie");
      } catch (e) {
        console.log(e);
      }
      app.globalData.isChangeLocal = false;
      // 更新视图
      this.setData({
        inTheaterMovie: this.data.inTheaterMovie
      });
    }
  },

  /**
   * 取消更新
   */
  addMovie: function (event) {
    console.log(event.target.dataset.id);
    // 删除数据
    // 找到数据的位置
    var index = this.isAddTo(event.target.dataset.id);
    // 删除该数据
    this.data.inTheaterMovie.splice(index, 1);
    // 更新localstorage
    try {
      wx.setStorageSync("my_movie", this.data.inTheaterMovie);
      app.globalData.isChangeLocal = true;
      // 更新视图
      this.setData({
        inTheaterMovie: this.data.inTheaterMovie
      });
    } catch (e) {
      console.log(e);
    }
    
  },

  /**
   * 判断电影是在内存中存放位置
   */
  isAddTo: function (id) {
    var len = this.data.inTheaterMovie.length;
    for (var i = 0; i < this.data.inTheaterMovie.length; ++i) {
      if (id == this.data.inTheaterMovie[i].id) {
        console.log(this.data.inTheaterMovie[i].id);
        return i;
      }
    }
    return -1;
  },
})