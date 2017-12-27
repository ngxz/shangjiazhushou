// pages/packet/packet.js
const recorderManager = wx.getRecorderManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  inputHidden:false,//点击答题按钮显示
	  getMoneyHidden:true,//抢到金额显示
	  modalStatus:true,//输入框隐藏
	  key:'',//输入的答案
	  type:1,//红包类型显示不同领取方式
	  tempFilePath:'',//录音文件地址
	  disable:true,//停留10秒领取，不可用
	  countdown:10,//初始10秒
	  disabletext:'秒后可以领取红包',//默认文字
  },
  /**
   * 预览
   */
  preView:function(){
	  wx.previewImage({
		  current: '../../img/logo.png', // 当前显示图片的http链接
		  urls: ['../../img/logo.png'] // 需要预览的图片http链接列表
	  })
  },
  /**
   * 按住开始录音
   */
  recorderBegin:function(){
	  recorderManager.start();
  },
  /**
   * 松开录音识别
   * 
   */
  recorderEnd:function(){
	  var that = this;
	  recorderManager.stop();
	  recorderManager.onStop((res) => {
		//   console.log('录音结束', res.tempFilePath);
		  that.setData({
			  tempFilePath : res.tempFilePath,
		  })
	  })
	  //发送语音进行识别抢红包
	  //
	  console.log(this.data.tempFilePath);
  },
  /**
   * 点击输入答案弹出窗口
   */
  	openModal:function(){
		this.setData({
			modalStatus: !this.data.modalStatus,
		})
	},
	/**
	 * 关闭
	 * 发送抢红包请求
	 */
	modalOk: function () {
		//抢到后改变页面
		this.setData({
			modalStatus: !this.data.modalStatus,
		})
		console.log(this.data.key);
		//发送请求
		// wx.request({
		// 	url: '',
		// 	header:{
		// 		'content/type':'application/json'
		// 	},
		// 	data:{
		// 		key:'',
		// 	},
		// 	success:function(){
		// 		//判断
		// 	}
		// })
	},
	/**
	 * 输入答案
	 */
	inputKey:function(e){
		this.setData({
			key:e.detail.value,
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 页面加载完成后
   * 类型为1.开始倒计时
   */
  onReady:function(){
	var type = this.data.type;
	var countdown = this.data.countdown;
	var that = this;
	function countDown() {
		countdown -= 1;
		that.setData({
			countdown: countdown,
		})
		if (countdown == 0){
			clearInterval(timer);
			that.setData({
				countdown:'',
				disable: !that.data.disable,
				disabletext:'点击领取红包',
			})
		}
	}
	if(type == 1){
		var timer = setInterval(countDown,1000);
	}
  },
  /**
   * 10秒结束，抢红包
   */
  getMoney:function(){
	//发送抢红包请求
	console.log('已经抢到');
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