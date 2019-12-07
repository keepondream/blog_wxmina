// pages/list/list.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    pics: {},
    articlePage: 0,
    articlepageSize: 5,
    articles: [],
    isHideLoadMore: true,  //是否隐藏底部加载
    isHideLoadMoreCompany: false, //是否隐藏到底部
    isfirst: false //是否首次数据加载成功

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中'
    })
    this.showNavigationBarLoading();
    //加载滑动图片
    this.getCurlPic("api/randpic/0/5")
    //加载文章
    this.getCurlArticle()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
    this.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getThisPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getCurlArticle()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /* 这里实现控制中间凸显图片的样式 */
  handleChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  //获取图片集
  getCurlPic: function(url) {
    let that = this
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    app.http(url,'GET').then((res)=>{
      that.setData({
        pics:res.data
      })
      // 隐藏导航上的加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },
  //页面显示加载动画
  showNavigationBarLoading: function() {
    wx.showNavigationBarLoading()
  },
  //页面隐藏加载动画
  hideNavigationBarLoading: function() {
    wx.hideNavigationBarLoading()
  },
  //获取文章
  getCurlArticle: function(pageSize) {
    //显示底部加载动画
    this.setData({
      isHideLoadMore: false,
      isHideLoadMoreCompany: true
    })
    //显示顶部刷新图标
    wx.showNavigationBarLoading();
    if (pageSize && pageSize != 5) {
      this.data.articlepageSize = pageSize
    }
    var url = "api/articles/" + this.data.articlePage + "/" + this.data.articlepageSize;
    var oldArticles = this.data.articles
    
    var oldArticlesCount = oldArticles.length
    let that = this
    app.http(url,'GET').then((res) => {
      that.data.articlePage++
      if (res.data) {
        let newDataCount = res.data.length
        for (let i = 0; i < newDataCount; i++) {
          oldArticles[oldArticlesCount + i] = res.data[i]
        }
        that.setData({
          articles: oldArticles
        })
      }
      // 隐藏导航上的加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
      // 取消底部加载动画
      that.setData({
        isHideLoadMore: true,
        isHideLoadMoreCompany: false
      })
      if (!that.data.isfirst){
        that.setData({
          isfirst: true
        })
      }
    }).catch((res)=>{
      that.setData({
        isHideLoadMore: true,
        isHideLoadMoreCompany: false
      })
    })

  },

  //下拉刷新
  getThisPullDownRefresh: function() {
    this.showNavigationBarLoading();
    //加载滑动图片
    this.getCurlPic("https://api.df5g.cn/api/randpic/0/5")
    //加载文章
    this.data.articlePage = 0
    this.setData({
      articles: []
    })
    this.getCurlArticle()
  }

})