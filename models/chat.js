const {chatsModel}=require('./schema/chat')

async function insertOne(data){
  const chatModel=new chatsModel(data)

  await chatModel.save()
}

async function find(query){
  return await chatsModel.find(query).lean()
}

module.exports={
  insertOne,
  find
}