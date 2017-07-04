// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {}
  },
  // makertap: function (e) {
  //   var that = this;
  //   var id = e.markerId;
  //   that.showSearchInfo(wxMarkerData);
  // },
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'nOQqvMwIh04BMjeQ4dwRW3H1c6ki5t04'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData);
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      that.showSearchInfo(wxMarkerData);
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      // iconPath: '../../img/marker_red.png',
      // iconTapPath: '../../img/marker_red.png'
    });
  },
  showSearchInfo: function (data) {
    console.log(data);
    var that = this;
    that.setData({
      rgcData: {
        address: '地址：' + data[0].address + '\n',
        desc: '描述：' + data[0].desc + '\n',
        business: '商圈：' + data[0].business
      }
    });
  }
})