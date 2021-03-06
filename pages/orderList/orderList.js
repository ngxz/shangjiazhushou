// pages/component/myorders/myorders.js

var app = getApp()
Page({
  data: {
    navbar: ['未付款', '待发货','待收货'],
    currentTab: 0,
    token:'',
	status:''
  },
  navbarTap: function (e) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    var status = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
	  status: e.currentTarget.dataset.idx,
    })
    //发送请求查询数据
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getorderlist',
      data: {
        token: this.data.token,
        status: this.data.status,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          orderList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载页面获取token
    var token = wx.getStorageSync('token');
    this.setData({
      token: token
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    //加载页面默认发送请求查询未付款数据
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getorderlist',
      data: {
        token: this.data.token,
        status: '0'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          orderList: res.data
        })
      }
    })
  },
  /**
   * 下拉事件
   */
  onPullDownRefresh:function(){
	  wx.showLoading({
		  title: '刷新中',
	  });
	  var that = this;
	  //发送请求查询数据
	  wx.request({
		  url: app.globalData.apiUrl + '/shopmall/getorderlist',
		  data: {
			  token: this.data.token,
			  status: this.data.status,
		  },
		  header: {
			  'content-type': 'application/json' // 默认值
		  },
		  success: function (res) {
			  wx.hideLoading();
			  wx.stopPullDownRefresh()
			  that.setData({
				  orderList: res.data
			  })
		  }
	  })
  }
})
