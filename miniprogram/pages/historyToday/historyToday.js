Page({
  data:{
    historyData:[],
    nowDate:'',
    flag:0
  },
  callFunction:function(){
    this.setData({
      flag:1
    })
    console.log("ok");
    wx.cloud.callFunction({
      name:"queryData"
    }).then(res=>{
      console.log(res)
      this.setData({
        historyData:res.result.data
      })
    })  
  },
  onLoad(){
    let nowDate=this.getTime()
    this.setData({
      nowDate:nowDate,
    })
  },
   //获取时间函数
   getTime(){
    let date=new Date()
    let month=date.getMonth()+1
    if(month<10){
      month= '0' +month
    }
    let day=date.getDate()
    if(day<10){
      day= '0' +day
    }
    let monthDay=month+'月'+day+'日'
    console.log(monthDay)
    return monthDay
  },
})