const moment=require('moment')
const{insertOne,find}=require('../models/chat')


/* 插入聊天内容 */
async function addContent(data){
  await insertOne(data)
}


/* 获取聊天信息 */
async function getContent(data){
  return await find({
    createdAt:{
      $gt:moment().subtract(1,'day').toDate(),
      $lt:moment().toDate()
    }
  })

}


module.exports={
  addContent,
  getContent
}