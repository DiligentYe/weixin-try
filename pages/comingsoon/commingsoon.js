// commingsoon.js
//获取应用实例
var app = getApp();
var loadUrl = 'https://api.douban.com/v2/movie/coming_soon';

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
    isEnd: false,
    // 存储已经添加收藏电影信息
    myMovies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 发送请求数据,请求电影信息
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
        // 更新数据
        that.appendData(res);
        // 更新视图
        that.setData({
          inTheaterMovie: that.data.inTheaterMovie,
          start: that.data.requestCount + that.data.start,
          total: res.total
        });
      },
      fail: function (res) {
        console.log('error');
      }
    });
    // 获取已收藏电影信息
    try {
      var my_movie = wx.getStorageSync('my_movie');
      this.data.myMovies = my_movie ? my_movie : [];
    } catch (e) {
      this.data.myMovies = [];
    }
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    console.log('bb');
    if (app.globalData.isChangeLocal) {
      // 获取已收藏电影信息
      try {
        var my_movie = wx.getStorageSync('my_movie');
        this.data.myMovies = my_movie ? my_movie : [];
      } catch (e) {
        this.data.myMovies = [];
      }
      // 更新数据
      var len = this.data.inTheaterMovie.length;
      for (var i = 0; i < len; ++i) {
        if (this.isAddTo(this.data.inTheaterMovie[i].id) != -1) {
          this.data.inTheaterMovie[i].isAdd = true;
        } else {
          this.data.inTheaterMovie[i].isAdd = false;
        }
      }
      app.globalData.isChangeLocal = false;
      // 更新视图
      this.setData({
        inTheaterMovie: this.data.inTheaterMovie
      });
    }
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
        var len = res.data.subjects.length;
        if (len != 0) {
          // 更新数据
          that.appendData(res);
          // 更新视图
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
  },

  /**
   * 判断电影收藏或者取消
   */
  addMovie: function (event) {
    // 如果已经收藏，则取消收藏
    // 在loacolstore中的位置
    var index_loc = this.isAddTo(event.target.dataset.id);
    // 在inTheaterMovie中的位置
    var index_data = this.getPosition(event.target.dataset.id);

    if (index_loc != -1) {
      this.data.inTheaterMovie[index_data].isAdd = false;
      this.data.myMovies.splice(index_loc, 1);

    } else {
      // 如果没有收藏，添加收藏
      this.data.inTheaterMovie[index_data].isAdd = true;
      this.data.myMovies.push(this.data.inTheaterMovie[index_data]);
    }
    // 更新localstore  
    try {
      wx.setStorageSync('my_movie', this.data.myMovies);
      app.globalData.isChangeLocal = true;
    } catch (e) {
      this.data.inTheaterMovie[index_data].isAdd = false;
    }
    //  
    this.setData({
      inTheaterMovie: this.data.inTheaterMovie,
    });
  },

  /**
   * 判断电影是否已经收藏，并返回在内存中存放位置
   */
  isAddTo: function (id) {
    var len = this.data.myMovies.length;
    for (var i = 0; i < this.data.myMovies.length; ++i) {
      if (id == this.data.myMovies[i].id) {
        console.log(this.data.myMovies[i].id);
        return i;
      }
    }
    return -1;
  },

  /**
   * 判断电影在inTheaterMovie中的位置
   */
  getPosition: function (id) {
    var len = this.data.inTheaterMovie.length;
    for (var i = 0; i < len; ++i) {
      if (this.data.inTheaterMovie[i].id == id) {
        return i;
      }
    }
  },

  /**
   * 处理请求新数据,添加isAdd属性，添加到inTheaterMovie
   */
  appendData: function (res) {
    var len = res.data.subjects.length;
    // 判断电影是否已经收藏, 添加相应的isAdd属性
    for (var i = 0; i < len; ++i) {
      if (this.isAddTo(res.data.subjects[i].id) != -1) {
        res.data.subjects[i].isAdd = true;
      } else {
        res.data.subjects[i].isAdd = false;
      }
    }
    // 将处理好的数据添加到inTheaterMovie中
    this.data.inTheaterMovie = this.data.inTheaterMovie.concat(res.data.subjects);
  }
});