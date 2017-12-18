var app = getApp()
Page({
  data: {
    date: new Date().getFullYear() + '-' + (new Date().getMonth()+1)+'-'+new Date().getDate(),
    zhangdan:''
  },
  bindDateChange: function (e) {
    wx.showLoading({
      title: '加载中',
    });
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    });
    var that = this;
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getzhangdan',
      data:{
        token:wx.getStorageSync('token'),
        date:this.data.date,
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        wx.hideLoading();
        that.setData({
          zhangdan:res.data,
        })
      }
    })
  },
  //页面加载后显示今日数据
  onReady:function(){
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getzhangdan',
      data: {
        token: wx.getStorageSync('token'),
        date: this.data.date,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        that.setData({
          zhangdan: res.data,
        })
      }
    })
  },
})