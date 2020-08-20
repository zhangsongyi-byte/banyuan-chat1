const mongoose=require('mongoose')
const { Schema } = mongoose

const chatsSchema = new Schema({
  nickName:String,
  /* 头像 */
  avatar:String,
  content:String,
  createdAt:{ type:Date, default: new Date() }
})
  
const chatsModel = mongoose.model('chats', chatsSchema)

module.exports = {
  chatsModel
}