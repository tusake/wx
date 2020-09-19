Page({
  data: {
    address: "暂无",
    latitude: "暂无",
    longitude: "暂无",
    weather: "暂无",
    number: null
  },
  chooselocation: function () {
    wx.chooseLocation({
      latitude: 0,
      longitude: 0,
      success: (result) => {
        wx.showLoading({
          title: 'Loading',
        })
        let i = Math.floor(Math.random() * 10)
        this.setData({
          address: result.address,
          latitude: result.latitude,
          longitude: result.longitude,
        })
        wx.hideLoading()
      },
      fail: () => {
        this.setData({
          address: "出现错误"
        })
      },
    })

    wx.cloud.callFunction({
      name:"getWeather"
    }).then(res=>{
      let i = Math.floor(Math.random()*100)%res.result.data[0].weather.length;
      this.setData({
        weather:res.result.data[0].weather[i],
        number:i
      })
    })
  },
})