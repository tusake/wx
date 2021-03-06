const db=wx.cloud.database();
const todos=db.collection('toDos');
Page({
  data:{
    tasks:[],
    image:'',
  },
    pageData:{//collection.skip()方法是在多条数据的情况下为了实现分页方法
      skip:0,
      locationOnobj:{}
    },
  //-----------------onXXX方法都是生命周期函数-----------------------
  onLoad:function(options){
    this.getData()
 },
  //加载到页面底部的函数
  onReachBottom:function(){
    this.getData()
  },
  //下拉刷新函数
  onPullDownRefresh:function(){
    this.getData(res=>{
      wx.stopPullDownRefresh();
      this.pageData.skip=0;
    })
  },
  //提交表单信息到云端数据库
  onSubmit:function(event){
    todos.add({
      data:{
        status:'进行中',
        title:event.detail.value.title,
        image:this.data.image,
        location:this.pageData.locationOnobj
      }
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title:"添加成功",
        icon:"success",
        success:res2=>{
          wx.redirectTo({
            url: `../toDoInfo/toDoInfo?id=${res._id}`,
          })
        }
      })
    })
  },
  //----------------------以上为 生命周期函数----------------------
  //获取云端数据库数据
  getData:function(callback){
    if(!callback){
      callback=res=>{}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res=>{
      let oldData=this.data.tasks;
      this.setData({
        tasks:oldData.concat(res.data)
      },res=>{
        this.pageData.skip=this.pageData.skip+10
        wx.hideLoading()
        callback();
      })
    })
  },
  //选择地址的函数
  chooseLocation:function(e){
     wx.chooseLocation({
       success:res=>{
         console.log(res);
         let locationOnobj={
           latitude:res.latitude,
           longitude:res.longitude,
           name:res.name,
           address:res.address,
         }
         this.pageData.locationOnobj=locationOnobj
       }
     })
  },
  //选择图片函数
  selectImage:function(e){
    wx.chooseImage({
      success:res=>{
        console.log(res.tempFilePaths[0]);
        wx.cloud.uploadFile({//将图片传到云端
           cloudPath:`${Math.floor(Math.random()*10000)}.png`,//云端的图片路径名称(名称要随机生成避免重复)
           filePath:res.tempFilePaths[0]//图片的根路径
        }).then(res=>{
          this.setData({
            image:res.fileID
          })
        }).catch(err=>{
          console.error(err)
        })
      }
    })
  },
})