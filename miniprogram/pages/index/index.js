Page({
  data:{
    nowDate:''
  },
  onLoad:function(){
    let nowDate=this.getTime()
    this.setData({
      nowDate:nowDate
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