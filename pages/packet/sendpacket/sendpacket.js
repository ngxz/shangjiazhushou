// pages/packet/sendpacket/sendpacket.js
var app=getApp();
var inputs = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
	type:['问答红包','普通红包','语音红包'],
	currentTab:0,
	status:'',
	focus:false,
	service:0,//要收的服务费
	total:0,//总共支付金额
	question:'',//设置问题
	answer:'',//设置答案
	money:'',//红包金额
	num:'',//红包数量
	note:'',//备注信息
	tempFilePaths:'',//图片路径
	preview:'',
	uploadImg:false,//默认显示点击上传
	previewImg:true,//默认不显示预览图片
	imgs:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 点击类型切换内容
   */
  typeTab:function(e){
	this.setData({
		status:e.currentTarget.dataset.idx,
		currentTab:e.currentTarget.dataset.idx,
	})
  },
  /**
   * 文本框获取焦点
   */
  bindFocus:function(){
	this.setData({
		focus:true,
	})
  },
  /**
   * 选择图片上传
   */
  selectImg:function(){
	  var that = this;
	  wx.showLoading({
		  title: '请稍后！',
	  })
	  wx.chooseImage({
		  count: 1, // 默认9
		  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		  complete:function(){
			  wx.hideLoading();
		  },
		  success: function (res) {
			  wx.hideLoading();
			  // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
			   var tempFilePaths = res.tempFilePaths;
			   var imgs = that.data.imgs;
			   for (var i = 0; i < tempFilePaths.length;i++){
				   imgs.push(tempFilePaths[i]);
			   }
			  
				that.setData({
					imgs:imgs,
					uploadImg: !that.data.uploadImg,
					previewImg: !that.data.previewImg,
				})
		  }
	  })
  },
  /**
   * 预览图片
   */
  previewImg:function(){
	  var imgs = this.data.imgs;
	  wx.previewImage({
		  current: imgs[0], // 当前显示图片的http链接
		  urls: imgs // 需要预览的图片http链接列表
	  })
  },
  /**
   * 删除图片
   */
  delImg:function(){
	  var imgs = this.data.imgs;
	  imgs.splice(0, 1);
	  this.setData({
		  imgs: imgs,
		  uploadImg: !this.data.uploadImg,
		  previewImg: !this.data.previewImg,
	  });
	  app.wxToast({
			title: "删除成功！"
		})
  },
  /**
   * 输入金额设置无付费
   */
  setService:function(e){
	var money = e.detail.value;
	if(!money){
		this.setData({
			service:0,
			total:0,
		})
		return;
	}
	var service = this.data.service;
	var total = this.data.total;
	// 运算
	service = money*0.02;
	total = parseFloat(money) + parseFloat(service);
	this.setData({
		service: service,
		total:total,
	})
  },
  /**
   * 输入框输入值
   */
  bindinput:function(e){
	  inputs[e.currentTarget.id] = e.detail.value;
  },
  /**
   * 点击生成按钮
   * 进行验证
   */
  generate:function(){
	  if(!inputs.question){
		  app.wxToast({
			  tapClose: true,
			  title: "请填写问题"
		  })
		  return;
	  	}
	  if (!inputs.answer) {
		  app.wxToast({
			  tapClose: true,
			  title: "请填写答案"
		  })
		  return;
	  }
	  if (!inputs.money) {
		  app.wxToast({
			  tapClose: true,
			  title: "请填写金额"
		  })
		  return;
	  }
	  if (!inputs.num) {
		  app.wxToast({
			  tapClose: true,
			  title: "请填写数量"
		  })
		  return;
	  }
	  wx.showLoading({
		  title: '生成中，请稍后！',
	  });
	//   console.log(inputs);
	//   wx.request({
	// 	  url: '',
	// 	  header: {
	// 		  'content-type': 'application/json'
	// 	  },
	// 	  data:{
				// imgUrl:imgs,
	// 		  data:inputs,
	// 	  },
	// 	  success:function(res){
	// 		wx.hideLoading();
	// 		console.log(res);
	// 	  }
	//   })
  }
})