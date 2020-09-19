const db=wx.cloud.database();
const todos=db.collection('toDos');
Page({
  data: {
    task:{},

  },
  pageData:{

  },
  onLoad:function(options){//options为跳转前页面传来的id
    this.pageData.id=options.id
    todos.doc(options.id).get().then(res=>{
      console.log(res);
      this.setData({
        task:res.data
      })
    })
  },
  //展示小地图的函数
  viewLocation:function(){
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name: this.data.task.location.name,
      address: this.data.task.location.address
    })
  },
  //完成任务函数
  finishTask:function(){
    console.log(this.data.task._id);
    let id=this.data.task._id
   wx.cloud.callFunction({
     name:'updataData',
     data:{
       //将这条list所对应的_id（数据库）传给云函数让其处理
         id:this.data.task._id
     },
   }).then(console.log)
  },
  //删除任务函数
  deleteTask:function(){
    let id=this.data.task._id
    wx.cloud.callFunction({
      name:'deleteData',
      data:{
          id:this.data.task._id
      },
    }).then(console.log)
  }
 })
