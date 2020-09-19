const cloud = require('wx-server-sdk')

cloud.init()

let db=cloud.database()

exports.main = async (event, context) => {
  console.log(event.log);
  
    return await db.collection('toDos').doc(event.id).update({
      data:{
        status:'已完成'
      }
    })
}