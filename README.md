# 电影

## 整体逻辑

### 显示正在上映及即将上映电影

  利用豆瓣电影api，获取电影信息
  利用百度地图api，根据当前位置判断所在城市

  当页面加载时，在onload函数中请求豆瓣电影数据接口，将接口数据展示出来添加到data中存放电影的属性中，然后通过setData函数将数据同步到对应页面中；
  
  每个电影都可以添加收藏，存储到localstore中；

  当页面从隐藏到显示时，直接调用onShow函数；
  
  当页面卸载（或者隐藏）然后加载（或者显示）时，都需要data中存放电影的属性与localstore中的数据进行对比，添加或者修改isAdd属性（是否已经收藏），如果该电影已经收藏，页面显示会有所不同。

### 正在上映及即将上映页面事件

1. showDetail 显示电影的详细信息
    wx.navigateTo({
      url: "../../pages/moviedetail/moviedetail?id=" + event.target.dataset.id
    });
    调用wx.navigateTo方法，url制定要导航到的页面的地址（相对路径）并通过在后面追加query，传递对应参数。

2. addMovie 将电影添加为收藏
    使用localstore进行本地存储（同步的方式）
    wx.setStorageSync('my_movie', this.data.myMovies);

### 我的电影页面事件

1. showCollection 显示我的收藏
    直接导航到相应页面进行操作
    wx.navigateTo({
      url: '../../pages/mymovie/mymovie'
    })

2. clearData 清空本地数据
    直接调用API，移除对应的本地存储
    wx.removeStorageSync("my_movie");

### 过程中遇到的问题

1. 非法域名
    需要在小程序主页添加request域名，必须为https

2. 路径问题
    必须使用相对路径

3. this指向问题
    对于异步操作，如wx.request，内部的this可能会丢失，需要绑定页面this（在进行也不操作直接调用 var that = this;或者使用call，apply等）

4. 配置window属性问题
    在app.json中需要指定"window"字段，但是在相应page.json中，由于只能配置window属性，因此，直接添加对象即可

5. 定义模版语法格式
    WXML中：
    <!--引入模版-->
      <import src="../intheaters/intheaters.wxml" />
    <!--渲染模版-->
      <template is="movieList" data="{{inTheaterMovie}}" />

    WXSS中：
    @import "../intheaters/intheaters.wxss";

6. request，get请求出现400 bad request问题
    官方文档有问题，最新版本，get请求的header中'content-type'需要设置为: 'json'
    header: {
          // 'content-type': 'application/json'
          'content-type': 'json'
    },

7. 豆瓣电影api中，无法利用get方法，请求不同的城市的电影数据

8. 








  

