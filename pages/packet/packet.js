// pages/packet/packet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
 * 下拉事件
 */
  onPullDownRefresh: function () {
	  wx.showLoading({
		  title: '刷新中',
	  });
	  var that = this;
	  //发送请求查询数据
	  wx.hideLoading();
	  wx.stopPullDownRefresh()
  }
})