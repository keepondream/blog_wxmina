//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authinfo: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    wx.showLoading({ title: '加载中'})
    this.showNavigationBarLoading();
    if (app.globalData.authinfo) {
      this.setData({
        authinfo: app.globalData.authinfo
      })
    } else {
      this.getCurl("https://api.df5g.cn/api/basicinfo");
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
    this.hideNavigationBarLoading();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getCurl: function(url) {
    let that = this
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      success(data) {
        if (data.statusCode == 200) {
          app.globalData.authinfo = data.data
          that.setData({
            authinfo: data.data
          })
          // 隐藏导航上的加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getCurl("https://api.df5g.cn/api/basicinfo");
  },
  //页面显示加载动画
  showNavigationBarLoading: function () {
    wx.showNavigationBarLoading()
  },
  //页面隐藏加载动画

  hideNavigationBarLoading: function () {
    wx.hideNavigationBarLoading()
  }
})