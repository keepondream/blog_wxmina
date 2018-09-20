// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    pics: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showNavigationBarLoading();
    wx.showLoading({ title: '加载中' })
    this.getCurlPic("https://api.df5g.cn/api/randpic/0/5")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
    this.hideNavigationBarLoading();
    console.log("渲染完成 onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("显示 onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("隐藏 onHide")
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

  },
  /* 这里实现控制中间凸显图片的样式 */
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  //获取图片集
  getCurlPic: function (url) {
    let that = this
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      success(data) {
        if (data.statusCode == 200) {
          that.setData({
            pics: data.data
          })
          // 隐藏导航上的加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      }
    })
  },
  //页面显示加载动画
  showNavigationBarLoading: function () {
    wx.showNavigationBarLoading()
  },
  //页面隐藏加载动画

  hideNavigationBarLoading: function () {
    wx.hideNavigationBarLoading()
  },
  //获取文章
  getCurlArticle: function (start,end) {
    let that = this
    var url = ""
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      success(data) {
        if (data.statusCode == 200) {
          that.setData({
            pics: data.data
          })
          // 隐藏导航上的加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      }
    })
  }
})