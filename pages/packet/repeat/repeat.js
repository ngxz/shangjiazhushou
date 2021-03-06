// pages/packet/repeat/repeat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  modalStatus: 'true',
  },
  /**
	 * 打开提示窗口
	 */
  modalOpen: function () {
	  this.setData({
		  modalStatus: !this.data.modalStatus,
	  })
  },
  /**
   * 关闭
   */
  modalOk: function () {
	  this.setData({
		  modalStatus: !this.data.modalStatus,
	  })
  },
  /**
   * 转发
   */
  onShareAppMessage: function (res) {
	  console.log(res);
	  if (res.from === 'button') {
		  // 来自页面内转发按钮
		  console.log(res.target)
	  }
	  return {
		  title: '自定义转发标题',
		  path: '/page/user?id=123',
		  success: function (res) {
			  // 转发成功
		  },
		  fail: function (res) {
			  // 转发失败
		  }
	  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  }
})