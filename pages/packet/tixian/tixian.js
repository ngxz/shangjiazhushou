// pages/packet/tixian/tixian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	userMoney:'100.00',
	money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 用户点击全部提现
   * 余额全部填入输入框
   */
  all:function(){
	this.setData({
		money:this.data.userMoney,
	})
  },
  /**
   * 点击提现按钮后提现
   */
  tixian:function(){
	//请求
  }
})